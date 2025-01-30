#!/usr/bin/env node

import { join } from 'node:path';

import input from '@inquirer/input';
import select from '@inquirer/select';
import { checkUpdates } from '@rodbe/check-updates';

import { initEvents } from '@/events';
import { ARCHETYPE_OPTIONS, DAY_IN_MS, WEEK_IN_MS } from '@/constants';
import { createNewProject } from '@/tasks/create-new-project';
import { getPkgJsonPath } from '@/helpers/rbx';

initEvents();

const init = async () => {
  let commandName = '';

  const { checkNewVersion } = checkUpdates({
    askToUpdate: true,
    dontAskCheckInterval: DAY_IN_MS,
    packageJsonPath: getPkgJsonPath(),
    updateCheckInterval: WEEK_IN_MS,
  });

  await checkNewVersion?.();

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

  createNewProject({
    archetypeType,
    author,
    commandName,
    description,
    projectDir,
    projectName,
    repositoryUrl,
    scope,
  });
};

await init();
