/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Coordinates from '~/model/coordinate_system/Coordinates';
import SizeRange from '~/model/coordinate_system/SizeRange';
import { getTypeElement } from '~/model/attributes/AttributeTypes';
import LayoutElementData from '../LayoutElementData';
import LayoutElementSectionData from '../LayoutElementSectionData';
import AttributeElementData from '../AttributeElementData';
import AttributeData from '../AttributeData';
import ProductAttributeElementData from '../ProductAttributeElementData';
import ProductAttributeData from '../ProductAttributeData';

export function calculateRowByIndex(
    numberOfItemsPerSection,
    index,
) {
    const row = index / numberOfItemsPerSection;

    return index % numberOfItemsPerSection === 0
        ? row
        : Math.floor(row);
}

export function calculateColumnByIndex(
    numberOfItemsPerSection,
    index,
) {
    return index % numberOfItemsPerSection;
}

export function calculateNumberOfRows(
    elements,
) {
    if (elements.length > 0) {
        return elements.reduce((max, element) => {
            if (element.y + element.height > max) {
                return element.y + element.height;
            }
            return max;
        }, elements[0].y);
    }
    return 0;
}

export function elementBasedOnPosition(
    elements,
    row,
    column,
    numberOfSections,
) {
    return elements.find(
        e => e.y === (row + numberOfSections) && (e.x + 1) === column,
    );
}

export function sectionBasedOnPosition(
    elements,
    row,
    numberOfSections,
) {
    return elements.find(s => s.y + 1 === row + numberOfSections);
}

export function generateAttributeElement(
    element,
) {
    const {
        id,
        type,
        label,
        min_width: minWidth,
        min_height: minHeight,
        max_width: maxWidth,
        max_height: maxHeight,
        x,
        y,
        width,
        height,
        required,
    } = element;

    return new AttributeElementData(
        new AttributeData(
            id,
            type,
            label,
        ),
        required,
        new SizeRange(
            minWidth,
            minHeight,
            maxWidth,
            maxHeight,
        ),
        new Coordinates(
            x + 1,
            x + width + 1,
            y + 1,
            y + height + 1,
        ),
        'AttributeElement',
    );
}

export function generateProductElement(
    element,
    row,
    numberOfSections,
    numberOfEmptySections,
) {
    const {
        id,
        x,
        width,
        height,
        required,
        type,
        name,
        hint,
        placeholder,
        parameters,
        value,
        options,
    } = element;

    const componentName = `ProductTemplate${getTypeElement(type)}`;
    const actualHeight = Math.ceil(height / 2);

    return new ProductAttributeElementData(
        new Coordinates(
            x + 1,
            x + width + 1,
            row + 1 + numberOfSections - numberOfEmptySections,
            row + actualHeight + 1 + numberOfSections - numberOfEmptySections,
        ),
        componentName,
        new ProductAttributeData(
            id,
            required,
            type,
            name,
            hint,
            placeholder,
            parameters,
            value,
            options,
        ),
    );
}

export function generatePlaceholderBasedOnRowAndColumn(
    numberOfSections,
    numberOfEmptySections,
    row,
    column,
    defaultComponent,
) {
    return new LayoutElementData(
        new Coordinates(
            column,
            column + 1,
            row + numberOfSections + 1 - numberOfEmptySections,
            row + numberOfSections + 2 - numberOfEmptySections,
        ),
        defaultComponent,
    );
}

export function generateSectionBasedOnRow(
    numberOfSections,
    numberOfColumns,
    row,
    sections,
    sectionComponentName,
) {
    const section = sections.find(s => s.row + 1 === row + numberOfSections);

    return new LayoutElementSectionData(
        new Coordinates(
            1,
            numberOfColumns + 1,
            row + numberOfSections,
            row + numberOfSections + 1,
        ),
        sectionComponentName,
        section ? section.title : '',
    );
}

export function generateProductSection(
    section,
    row,
    numberOfSections,
    numberOfEmptySections,
    numberOfColumns,
    sectionComponentName,
) {
    return new LayoutElementSectionData(
        new Coordinates(
            1,
            numberOfColumns + 1,
            row + numberOfSections - numberOfEmptySections,
            row + numberOfSections + 1 - numberOfEmptySections,
        ),
        sectionComponentName,
        section.label,
    );
}

export function generateLayout(
    numberOfColumns,
    numberOfItems,
    defaultComponent,
    elements = [],
    sections = [],
) {
    const templateLayout = [];

    // Generating template designer
    let i = 0;
    let numberOfSections = 0;
    let layoutElement;

    while (i < numberOfItems) {
        const row = calculateRowByIndex(numberOfColumns + 1, i);
        // Every 5th element is a section
        const isSection = i % (numberOfColumns + 1) === 0;
        if (isSection) {
            // Section
            numberOfSections += 1;
            layoutElement = generateSectionBasedOnRow(
                numberOfSections,
                numberOfColumns,
                row,
                sections,
                'TemplateGridSection',
            );
        } else {
            const column = calculateColumnByIndex(numberOfColumns + 1, i);
            const element = elementBasedOnPosition(elements, row, column, numberOfSections);

            layoutElement = element
                ? generateAttributeElement(element)
                : generatePlaceholderBasedOnRowAndColumn(
                    numberOfSections,
                    0,
                    row,
                    column,
                    defaultComponent,
                );
        }
        templateLayout.push(layoutElement);
        i += 1;
    }

    return templateLayout;
}

export function generateProductLayout(
    elements,
) {
    const numberOfColumns = 4;
    const numberOfRows = calculateNumberOfRows(elements);
    const sectionsCount = Math.ceil(numberOfRows / 2);
    const totalElementsCount = numberOfRows % 2 === 0
        ? sectionsCount + sectionsCount * numberOfColumns
        : sectionsCount + (sectionsCount - 1) * numberOfColumns;
    const templateLayout = [];

    let i = 0;
    let numberOfSections = 0;
    let numberOfPositionsToMoveUpper = 0;

    while (i < totalElementsCount) {
        const row = calculateRowByIndex(numberOfColumns + 1, i);
        // Every 5th element is a section
        const isSection = i % (numberOfColumns + 1) === 0;
        if (isSection) {
            numberOfSections += 1;
            const section = sectionBasedOnPosition(
                elements,
                row,
                numberOfSections,
            );
            if (section) {
                templateLayout.push({
                    x: 1,
                    y: row + numberOfSections - numberOfPositionsToMoveUpper,
                    width: numberOfColumns,
                    height: 1,
                    title: section.label,
                    component: 'ProductTemplateSection',
                });
            } else {
                // When section is empty, we want to move upper all of the elements - remove empty sections
                numberOfPositionsToMoveUpper += 1;
            }
        } else {
            const column = calculateColumnByIndex(
                numberOfColumns + 1,
                i,
            );
            const element = elementBasedOnPosition(
                elements,
                row,
                column,
                numberOfSections,
            );

            if (element) {
                const {
                    id,
                    x,
                    width,
                    height,
                    required,
                    type,
                    name,
                    hint,
                    placeholder,
                    parameters,
                    value,
                    options,
                } = element;

                const parsedElement = {
                    x: x + 1,
                    y: row + 1 + numberOfSections - numberOfPositionsToMoveUpper,
                    width,
                    height: Math.ceil(height / 2),
                    component: `ProductTemplate${getTypeElement(type)}`,
                    name,
                    placeholder,
                    required,
                    value,
                    attributeId: id,
                    hint: hint || '',
                };

                if (options) {
                    parsedElement.options = options;
                }

                if (parameters) {
                    parsedElement.parameters = parameters;
                }

                templateLayout.push(parsedElement);
            }
        }
        i += 1;
    }

    return templateLayout;
}

export default {
    calculateRowByIndex,
    calculateColumnByIndex,
    elementBasedOnPosition,
    generateAttributeElement,
    generatePlaceholderBasedOnRowAndColumn,
    generateSectionBasedOnRow,
    generateProductSection,
    generateProductElement,
    generateLayout,
    generateProductLayout,
};
