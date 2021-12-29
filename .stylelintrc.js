/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
module.exports = {
    extends: [
        'stylelint-config-recommended-scss',
    ],
    plugins: [
        'stylelint-order',
    ],
    rules: {
        'no-descending-specificity': null,
        'no-empty-source': null,
        'font-family-no-missing-generic-family-keyword': null,
        indentation: 4,
        'max-empty-lines': 1,
        'number-leading-zero': 'always',
        'at-rule-empty-line-before': null,
        'color-named': 'never',
        'time-min-milliseconds': 100,
        'shorthand-property-no-redundant-values': true,
        'declaration-block-no-redundant-longhand-properties': true,
        'declaration-block-single-line-max-declarations': 1,
        'selector-max-empty-lines': 0,
        'function-comma-space-after': 'always',
        'function-comma-space-before': 'never',
        'function-max-empty-lines': 0,
        'function-whitespace-after': 'always',
        'number-no-trailing-zeros': true,
        'string-quotes': 'double',
        'length-zero-no-unit': true,
        'unit-case': 'lower',
        'value-list-max-empty-lines': 0,
        'value-list-comma-space-after': 'always-single-line',
        'value-list-comma-newline-after': 'always',
        'declaration-bang-space-before': 'always',
        'declaration-colon-newline-after': 'always-multi-line',
        'declaration-colon-space-after': 'always-single-line',
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-trailing-semicolon': 'always',
        'block-closing-brace-empty-line-before': 'never',
        'block-closing-brace-newline-before': 'always',
        'block-opening-brace-newline-after': 'always',
        'block-opening-brace-space-before': 'always',
        'selector-list-comma-space-before': 'never',
        'rule-empty-line-before': [
            'always-multi-line',
            {
                except: ['first-nested'],
                ignore: ['after-comment'],
            },
        ],
        'order/order': [
            'custom-properties',
            'dollar-variables',
            'at-variables',
            'declarations',
            {
                type: 'at-rule',
                name: 'media',
            },

        ],
        'order/properties-order': [
            {
                groupName: 'Positioning Properties',
                properties: [
                    'position',
                    'top',
                    'left',
                    'bottom',
                    'right',
                    'z-index',
                ],
            },
            {
                groupName: 'Layout Properties',
                properties: [
                    'display',
                    'flex',
                    'grid',
                    'flex-direction',
                    'flex-wrap',
                    'justify-content',
                    'align-items',
                    'align-content',
                    'float',
                    'clear',
                ],
            },
            {
                groupName: 'Box Model Properties',
                properties: [
                    'width',
                    'height',
                    'border',
                    'padding',
                    'margin',
                    'line-height',
                    'box-sizing',
                ],
            },
            {
                groupName: 'Visual Properties',
                properties: [
                    'background',
                    'background-color',
                    'box-shadow',
                    'animation',
                    'transition',
                    'opacity',
                    'visibility',
                ],
            },
            {
                groupName: 'Typography Properties',
                properties: [
                    'color',
                    'font',
                    'font-size',
                    'font-family',
                    'font-weight',
                    'text-align',
                    'text-transform',
                    'text-overflow',
                ],
            },
            {
                groupName: 'Misc Properties',
                properties: [
                    'content',
                    'cursor',
                    'overflow',
                ],
            },
        ],
    },
};
