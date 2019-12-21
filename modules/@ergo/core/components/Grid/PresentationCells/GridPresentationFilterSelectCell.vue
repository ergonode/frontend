/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="presentation-select-cell">
        <GridPresentationFilterCell :value="value" />
        <IconArrowDropDown />
    </div>
</template>

<script>
import GridPresentationFilterCell from '@Core/components/Grid/PresentationCells/GridPresentationFilterCell';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'GridPresentationFilterSelectCell',
    components: {
        GridPresentationFilterCell,
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
    .presentation-select-cell {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
</style>
