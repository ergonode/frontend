/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="presentation-select-cell">
        <GridPresentationCell :value="value" />
        <IconArrowDropDown />
    </div>
</template>

<script>
import GridPresentationCell from '@Core/components/Grid/PresentationCells/GridPresentationCell';
import IconArrowDropDown from '~/components/Icon/Arrows/IconArrowDropDown';

export default {
    name: 'GridPresentationSelectCell',
    components: {
        GridPresentationCell,
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
