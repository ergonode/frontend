/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ title, image = null, layout }) {
    const sections = layout.filter(
        e => e.component === 'TemplateGridSection'
            && e.label !== '',
    ).map(
        e => ({
            row: e.coordinates.yPos.start - 1,
            title: e.label,
        }),
    );

    const elements = layout.filter(
        e => e.component === 'AttributeElement',
    ).map(
        e => ({
            id: e.data.id,
            x: e.coordinates.xPos.start - 1, // Start from 0 at backend
            y: e.coordinates.yPos.start - 1, // Start from 0 at backend
            width: e.coordinates.xPos.end - e.coordinates.xPos.start,
            height: e.coordinates.yPos.end - e.coordinates.yPos.start,
            required: Number(e.required),
        }),
    );

    return {
        name: title,
        image,
        sections,
        elements,
    };
}
