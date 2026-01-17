module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'boundaries'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:boundaries/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "boundaries/no-unknown-files": ["error"],
    "boundaries/element-types": ["error", {
      "default": "disallow",
      "rules": [
        {
          "from": "Infrastructure",
          "allow": ["Application", "Domain"]
        },
        {
          "from": "Application",
          "allow": ["Domain"]
        }
      ]
    }],
  },
  "settings": {
    "boundaries/include": ["src/Module/**"],
    "boundaries/elements": [
      {
        "type": "Infrastructure",
        "pattern": "Infrastructure/**"
      },
      {
        "type": "Application",
        "pattern": "Application/**"
      },
      {
        "type": "Domain",
        "pattern": "Domain/**"
      }
    ],
    "import/resolver": {
      "eslint-import-resolver-node": {},
      typescript: {
        alwaysTryTypes: true,
      },
    },
  }
};
