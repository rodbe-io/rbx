#!/usr/bin/env node

import { join } from 'node:path';

import input from '@inquirer/input';
import select from '@inquirer/select';

import { initEvents } from '@/events';
import { ARCHETYPE_OPTIONS } from '@/constants';
import { cloneArchetype, initGitRepository, removeGitFolder } from '@/helpers/git';
import { renameFiles, replaceKeys, updatePackageJson } from '@/helpers/files';

initEvents();

const init = async () => {
  let commandName = '';

  const archetypeType = await select({
    choices: ARCHETYPE_OPTIONS,
    default: ARCHETYPE_OPTIONS[0]?.value,
    message: 'Archetype type:',
  });
  const projectName = (
    await input({
      message: 'Project name:',
      required: true,
    })
  ).trim();
  const scope = (
    await input({
      message: 'Scope: (Optional)',
    })
  ).trim();
  const description = (
    await input({
      message: 'Description: (Optional)',
    })
  ).trim();
  const repositoryUrl = (
    await input({
      message: 'Repository url (HTTPS):',
      required: true,
    })
  ).trim();
  const author = (
    await input({
      message: 'Author: (Optional)',
    })
  ).trim();

  if (archetypeType === 'ts-cli') {
    commandName = (
      await input({
        message: 'Command name:',
        required: true,
      })
    )
      .trim()
      .toLowerCase();
  }

  const projectDir = join(process.cwd(), projectName);

  cloneArchetype({ archetypeType, projectDir, projectName });
  removeGitFolder(projectDir);
  updatePackageJson({
    archetypeType,
    author,
    commandName,
    description,
    projectDir,
    projectName,
    repositoryUrl,
    scope,
  });
  replaceKeys(projectDir);
  if (archetypeType === 'ts-cli') {
    renameFiles({ commandName, projectDir });
  }
  initGitRepository(projectDir);
};

await init();
