module.exports = {
  "env": {
      "node": true,
      "commonjs": true,
      "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "no-eq-null": 2,
      "require-await": 2,
      "global-require": 2,
      "no-return-await": 1,
      "no-empty-function": 1,
      "no-mixed-requires": 2,
      "handle-callback-err": 1,
      "no-use-before-define": 2,
      "array-callback-return": 2,
      "no-buffer-constructor": 2,
      "no-async-promise-executor": 2,
      "no-misleading-character-class": 1,
  }
};