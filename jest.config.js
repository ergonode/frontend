/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

module.exports = {
    verbose: true,
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
        '@Core/(.*)$': '<rootDir>/modules/@ergo/core/$1',
        '@Templates/(.*)$': '<rootDir>/modules/@ergo/product-templates/$1',
        '@Attributes/(.*)$': '<rootDir>/modules/@ergo/attributes/$1',
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
    testURL: 'http://localhost/',
    reporters: [
        'default',
        ['jest-junit', { suiteName: 'jest tests', outputDirectory: 'build', outputName: './jest-junit.xml' }],
    ],
};
