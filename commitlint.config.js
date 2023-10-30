module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    'scope-enum': [2, 'always', ['infra', 'frontend', 'api', 'db', 'config', 'security', 'deps']]
  },
};
