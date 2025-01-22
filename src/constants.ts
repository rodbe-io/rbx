export const ARCHETYPE_REPOSITORIES = {
  'ts-cli': 'https://github.com/rodbe-io/template-ts-cli.git',
  'ts-lib': 'https://github.com/rodbe-io/template-ts-lib.git',
} as const;

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
