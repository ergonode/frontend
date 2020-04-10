/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="presentation-select-filter-cell">
        <GridFilterPresentationCell
            placeholder="Select..."
            :value="value" />
        <IconArrowDropDown />
    </div>
</template>

<script>
import GridFilterPresentationCell from '@Core/components/Grid/Layout/Table/Cells/Presentation/GridFilterPresentationCell';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';

export default {
    name: 'GridSelectFilterPresentationCell',
    components: {
        GridFilterPresentationCell,
        IconArrowDropDown,
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .presentation-select-filter-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
