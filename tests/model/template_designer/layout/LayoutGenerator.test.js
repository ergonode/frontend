/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    generateProductLayout,
    calculateRowByIndex,
    sectionBasedOnPosition,
} from '~/model/template_designer/layout/LayoutGenerator';

test('Layout length for given elements', () => {
    let elements = [];

    const emptyLayout = generateProductLayout(elements);
    expect(emptyLayout).toHaveLength(0);

    elements = [
        {
            x: 0,
            y: 0,
            height: 1,
            width: 4,
            label: 'sec1',
            variant: 'UI',
            type: 'SECTION',
        },
        {
            x: 0,
            y: 2,
            height: 1,
            width: 4,
            label: 'sec2',
            variant: 'UI',
            type: 'SECTION',
        },
        {
            x: 0,
            y: 4,
            height: 1,
            width: 4,
            label: 'sec3',
            variant: 'UI',
            type: 'SECTION',
        },
        {
            x: 0,
            y: 8,
            height: 1,
            width: 4,
            label: 'sec5',
            variant: 'UI',
            type: 'SECTION',
        },
    ];

    const layout = generateProductLayout(elements);
    expect(layout).toHaveLength(4);
});

test('Row is equal at index', () => {
    const numberItemsPerSection = 5; // Section included
    const index = 6;
    const row = calculateRowByIndex(numberItemsPerSection, index);

    expect(row).toBe(1);
});

test('Section doesnt exist at row', () => {
    const elements = [
        {
            x: 0,
            y: 8,
            height: 1,
            width: 4,
            label: 'sec5',
            variant: 'UI',
            type: 'SECTION',
        },
    ];
    const numberItemsPerSection = 5; // Section included
    const index = 6;
    const row = calculateRowByIndex(numberItemsPerSection, index);
    const numberOfSections = 0;
    const section = sectionBasedOnPosition(elements, row, numberOfSections);

    expect(section).toBeUndefined();
});
