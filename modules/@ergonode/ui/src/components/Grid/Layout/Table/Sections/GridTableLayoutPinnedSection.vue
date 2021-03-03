/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        data-cy="pinned-section"
        :class="classes">
        <slot />
    </div>
</template>

<script>
import {
    PINNED_COLUMN_STATE,
} from '@Core/defaults/grid';

export default {
    name: 'GridTableLayoutPinnedSection',
    props: {
        /**
         * The state of column. Columns might be pinned to the right or left side
         */
        pinnedState: {
            type: String,
            required: true,
            validator: value => Object.values(PINNED_COLUMN_STATE).indexOf(value) !== -1,
        },
        /**
         * The model of pinned sections
         */
        sections: {
            type: Object,
            default: () => ({
                [PINNED_COLUMN_STATE.LEFT]: false,
                [PINNED_COLUMN_STATE.RIGHT]: false,
            }),
        },
    },
    computed: {
        classes() {
            return [
                'pinned-section',
                `pinned-section--${this.pinnedState}`,
                {
                    'pinned-section--pinned': this.sections[this.pinnedState],
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .pinned-section {
        position: sticky;
        z-index: $Z_INDEX_LVL_6;
        display: flex;
        width: max-content;
        height: fit-content;

        &--left {
            left: 0;
        }

        &--right {
            right: 0;
        }

        &--pinned {
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
