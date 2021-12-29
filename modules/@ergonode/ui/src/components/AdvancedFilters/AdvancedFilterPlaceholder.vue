/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="advanced-filters-placeholder">
        <IconDragDrop :fill-color="graphiteLightColor" />
        Drag the attribute to add a filter
    </div>
</template>

<script>
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'AdvancedFilterPlaceholder',
    computed: {
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters-placeholder {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        color: $GRAPHITE_LIGHT;
        font: $FONT_MEDIUM_12_16;
    }
</style>
