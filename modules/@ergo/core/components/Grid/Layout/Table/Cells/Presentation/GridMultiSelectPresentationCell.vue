/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="presentation-multi-select-cell">
        <GridPresentationCell :value="presentationValue" />
        <IconArrowDropDown v-if="!isLocked" />
    </div>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';

export default {
    name: 'GridMultiSelectPresentationCell',
    components: {
        GridPresentationCell,
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({
            }),
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        presentationValue() {
            if (!this.value) return '';

            return this.value.map((option) => {
                if (typeof this.options[option] === 'undefined') {
                    return '';
                }

                return this.options[option].label || `#${this.options[option].code}`;
            }).join(', ');
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-multi-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
