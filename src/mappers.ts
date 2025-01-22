export const getHttpsRepositoryUrl = (repositoryUrl: string) => {
  const isGithub = repositoryUrl.includes('github.com');

  if (!isGithub) {
    return repositoryUrl;
  }

  if (repositoryUrl.startsWith('git@')) {
    return repositoryUrl.replace(':', '/').replace('git@', 'https://').replace('.git', '');
  }

  return repositoryUrl;
};

export const getScope = (scope: string) => {
  if (!scope) {
    return '';
  }

  if (scope.startsWith('@')) {
    return scope;
  }

  return `@${scope}`;
};

export const getPackageName = (scope: string, projectName: string) => {
  if (!scope) {
    return projectName;
  }

  return `${scope}/${projectName}`;
};
