module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "func-names": 0,
    "new-cap": 0,
    "max-len": ["error", 140],
    "comma-dangle": 0,
    "no-console": "off",
    "padded-blocks": 0,
    "no-nested-ternary": "off"
  },
  overrides: [
    {
      "files": ["test.*.js"],
      "rules": {
        "func-names": "off",
        "prefer-arrow-callback": "off",
        "no-undef": "off"
      }
    }
  ],
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
};
