/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
        "cypress/globals": true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'airbnb-base',
        'plugin:vue/recommended',
        'plugin:jest/recommended',
        'plugin:cypress/recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'jest',
        'notice',
        'cypress'
    ],
    // add your custom rules here
    rules: {
        'notice/notice':[
          "error", {
            "templateFile":"./config/.copyright",
            "messages":{
              "whenFailedToMatch":"Couldn't find 'License Header', are you sure you added it?"
            }
          },
        ],
        'no-console': 'off',
        'no-alert': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'import/no-unresolved': ['off'],
        'import/prefer-default-export': ['off'],
        'import/order': ['off'],
        'vue/html-indent': ['error', 4],
        'vue/html-closing-bracket-newline': ['off'],
        'indent': ['error', 4],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state',
            ],
        }],
        'class-methods-use-this':['off'],
        'global-require': ['off'],
        'import/no-dynamic-require': ['off'],
        'no-underscore-dangle': 'off',
        'no-unused-vars':['error', { 'argsIgnorePattern': 'commit' }],
        'max-len': ['error', {
            'code': 100,
            'ignoreTrailingComments': true,
            'ignoreComments': true,
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
        }],
        'vue/component-name-in-template-casing': ['error',
             'PascalCase',
             {
                'ignores': ['nuxt', 'nuxt-link'],
             }
        ],
        'vue/order-in-components': ['error', {
              'order': [
                'asyncData',
                'fetch',
            ],
        }],
    }
};
