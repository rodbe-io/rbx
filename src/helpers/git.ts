import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';

import { tryCatch } from '@rodbe/fn-utils';

import { ARCHETYPE_REPOSITORIES, type ArchetypeTypes } from '@/constants';

export const initGitRepository = (projectDir: string) => {
  execSync('git init', {
    cwd: projectDir,
    stdio: [process.stdin, process.stdout, process.stderr],
  });
  execSync('git add -A', {
    cwd: projectDir,
    stdio: [process.stdin, process.stdout, process.stderr],
  });
  execSync('git commit -m "Initial commit"', {
    cwd: projectDir,
    stdio: [process.stdin, process.stdout, process.stderr],
  });
};

export const removeGitFolder = (projectDir: string) => {
  const gitTempletePath = join(projectDir, '.git');

  rmSync(gitTempletePath, { force: true, recursive: true });
};

interface CloneArchetypeProps {
  archetypeType: ArchetypeTypes;
  projectDir: string;
  projectName: string;
}

export const cloneArchetype = ({ archetypeType, projectDir, projectName }: CloneArchetypeProps) => {
  const [err] = tryCatch(() => {
    console.log(`Clonando archetype: ${projectName}`);
    const templateUrl = ARCHETYPE_REPOSITORIES[archetypeType];

    execSync(`git clone ${templateUrl} --depth 1 ${projectDir}`, { stdio: 'inherit' });
    console.log('Proyecto clonado con éxito.');
  });

  if (err) {
    console.error('Error al crear el proyecto:', err);
  }
};
