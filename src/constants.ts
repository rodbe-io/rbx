export const ARCHETYPE_REPOSITORIES = {
  'ts-cli': 'https://github.com/rodbe-io/template-ts-cli.git',
  'ts-lib': 'https://github.com/rodbe-io/template-ts-lib.git',
} as const;

export const KEY_RBX_COMMAND = 'RBX_COMMAND';

export type ArchetypeTypes = keyof typeof ARCHETYPE_REPOSITORIES;

interface ArchetypeOption {
  description: string;
  name: string;
  value: ArchetypeTypes;
}

export const ARCHETYPE_OPTIONS: Array<ArchetypeOption> = [
  {
    description: 'Creates a TypeScript library with a basic structure and configuration.',
    name: 'TS Library',
    value: 'ts-lib',
  },
  {
    description: 'Creates a TypeScript CLI with a basic structure and configuration.',
    name: 'TS CLI',
    value: 'ts-cli',
  },
];

export const REGISTRIES_OPTIONS = [
  {
    description: 'NPM registry',
    name: 'npm',
    url: 'https://registry.npmjs.org',
    value: 'npm',
  },
  {
    description: 'GitHub registry',
    name: 'github',
    url: 'https://npm.pkg.github.com',
    value: 'github',
  },
] as const;

export type RegistryType = (typeof REGISTRIES_OPTIONS)[number]['value'];

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

export const DAY_IN_MS = 24 * HOUR_IN_MS;
export const WEEK_IN_MS = 7 * DAY_IN_MS;
