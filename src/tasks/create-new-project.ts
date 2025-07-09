import { cloneArchetype, initGitRepository, removeGitFolder } from '@/helpers/git';
import { renameFiles, replaceKeys, updatePackageJson } from '@/helpers/files';
import { type ArchetypeTypes, KEY_RBX_COMMAND, type RegistryType } from '@/constants';

interface CreateNewProjectProps {
  archetypeType: ArchetypeTypes;
  author: string;
  commandName: string;
  description: string;
  projectDir: string;
  projectName: string;
  registryType: RegistryType;
  repositoryUrl: string;
  scope: string;
}

export const createNewProject = async ({
  archetypeType,
  author,
  commandName,
  description,
  projectDir,
  projectName,
  registryType,
  repositoryUrl,
  scope,
}: CreateNewProjectProps) => {
  cloneArchetype({ archetypeType, projectDir, projectName });
  removeGitFolder(projectDir);
  updatePackageJson({
    archetypeType,
    author,
    commandName,
    description,
    projectDir,
    projectName,
    registryType,
    repositoryUrl,
    scope,
  });
  await replaceKeys(projectDir)({ from: KEY_RBX_COMMAND, to: commandName });
  if (archetypeType === 'ts-cli') {
    renameFiles({ commandName, projectDir });
  }
  initGitRepository(projectDir);
};
