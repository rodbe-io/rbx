import { join } from 'node:path';
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';

import { replaceInFile } from 'replace-in-file';
import { to } from '@rodbe/fn-utils';

import { getHttpsRepositoryUrl, getPackageName, getScope } from '@/mappers';
import type { ArchetypeTypes } from '@/constants';

interface ReplaceInFileProps {
  from: string;
  to: string;
}

export const replaceKeys =
  (projectDir: string) =>
  async ({ from, to: toRename }: ReplaceInFileProps) => {
    const regex = new RegExp(from, 'g');
    const config = {
      files: join(projectDir, '**', '*.*'),
      from: regex,
      ignore: [join(projectDir, 'node_modules', '*.*'), join(projectDir, '.git', '*.*')],
      to: toRename,
    };

    const [err, results] = await to(replaceInFile(config));

    if (err) {
      console.error('Error occurred:', err);

      return;
    }

    console.log('Replacement results:', results);
  };

interface RenameFilesProps {
  commandName: string;
  projectDir: string;
}

export const renameFiles = ({ commandName, projectDir }: RenameFilesProps) => {
  const commmandTemaplteFilePath = join(projectDir, 'src', 'commands', 'RBX_COMMAND.ts');
  const commmandFilePath = join(projectDir, 'src', 'commands', `${commandName}.ts`);

  renameSync(commmandTemaplteFilePath, commmandFilePath);
};

interface UpdatePackageJsonProps {
  archetypeType: ArchetypeTypes;
  author: string;
  commandName?: string;
  description: string;
  projectDir: string;
  projectName: string;
  repositoryUrl: string;
  scope: string;
}

interface PackageJson {
  author: string;
  bin?: Record<string, string>;
  bugs: {
    url: string;
  };
  description: string;
  homepage: string;
  keywords: Array<string>;
  name: string;
  repository: {
    url: string;
  };
}

export const updatePackageJson = ({
  archetypeType,
  author,
  commandName,
  description,
  projectDir,
  projectName,
  repositoryUrl,
  scope,
}: UpdatePackageJsonProps) => {
  const packageJsonPath = join(projectDir, 'package.json');

  if (existsSync(packageJsonPath)) {
    const httpsRepositoryUrl = getHttpsRepositoryUrl(repositoryUrl);
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson;

    packageJson.name = getPackageName(getScope(scope), projectName);
    packageJson.description = description;
    packageJson.author = author;
    packageJson.bugs.url = `${httpsRepositoryUrl}/issues`;
    packageJson.homepage = httpsRepositoryUrl;
    packageJson.repository.url = `git+${httpsRepositoryUrl}.git`;
    if (commandName) {
      packageJson.bin = { [commandName]: `./dist/commands/${commandName}.js` };
    }
    if (archetypeType === 'ts-cli') {
      packageJson.keywords = [...packageJson.keywords, 'cli', 'cli-app', 'cli-tool', 'unix'];
    }

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  } else {
    console.log('No se encontró un archivo package.json en la plantilla.');
  }
};
