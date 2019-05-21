/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    props: {
        layoutElement: {
            type: Object,
            required: true,
        },
    },
    computed: {
        gridItemPosition() {
            const { xPos, yPos } = this.layoutElement.coordinates;
            return {
                gridColumn: `${xPos.start} / ${xPos.end}`,
                gridRow: `${yPos.start} / ${yPos.end}`,
            };
        },
    },
};
