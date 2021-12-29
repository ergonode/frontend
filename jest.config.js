/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
    ],
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '@UI/(.*)$': '<rootDir>/modules/@ergonode/ui/src/$1',
        '@Core/(.*)$': '<rootDir>/modules/@ergonode/core/src/$1',
        '@Authentication/(.*)$': '<rootDir>/modules/@ergonode/core/src/$1',
        '@Templates/(.*)$': '<rootDir>/modules/@ergonode/product-templates/src/$1',
        '@Attributes/(.*)$': '<rootDir>/modules/@ergonode/attributes/src/$1',
        '@Notifications/(.*)$': '<rootDir>/modules/@ergonode/notifications/src/$1',
        '@Workflow/(.*)$': '<rootDir>/modules/@ergonode/workflow/src/$1',
    },
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.(vue)$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        'node_modules/',
    ],
    testMatch: [
        '**/(__tests__|tests)/**/*.test.(js|jsx|ts|tsx)',
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/.*/__mocks__',
    ],
    testURL: 'http://localhost/',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'jest tests',
                outputDirectory: 'build',
                outputName: './jest-junit.xml',
            },
        ],
    ],
};
