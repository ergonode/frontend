/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import GridEditNavigationCell from '@UI/components/Grid/Layout/Table/Cells/Navigation/GridEditNavigationCell';

export default {
    components: {
        GridEditNavigationCell,
    },
    props: {
        value: {
            type: Object,
            default: () => ({
                [FILTER_OPERATOR.EQUAL]: [],
            }),
        },
        bounds: {
            type: [
                DOMRect,
                Object,
            ],
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        columnId: {
            type: [
                Number,
                String,
            ],
            required: true,
        },
    },
    data() {
        return {
            localValue: this.value[FILTER_OPERATOR.EQUAL],
        };
    },
    computed: {
        positionStyle() {
            const {
                x,
                y,
                width,
                height,
            } = this.bounds;

            return {
                top: `${y}px`,
                left: `${x}px`,
                width: `${width}px`,
                minHeight: `${height}px`,
            };
        },
    },
    methods: {
        onEditCell() {
            this.$emit('dismiss');
        },
    },
};
