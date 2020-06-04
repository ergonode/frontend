/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="presentation-select-cell">
        <GridPresentationCell :value="presentationValue" />
        <IconArrowDropDown v-if="!isLocked" />
    </div>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridPresentationCell';

export default {
    name: 'GridSelectPresentationCell',
    components: {
        GridPresentationCell,
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        presentationValue() {
            if (!this.options[this.value]) return '';

            const { code, label } = this.options[this.value];

            return label || `${code}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
