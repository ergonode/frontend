/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="template-grid-ghost-item">
        <div class="container">
            <IconAddFilter :fill-color="whiteColor" />
            ADD ATTRIBUTE
        </div>
    </div>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'TemplateGridGhostItem',
    components: {
        IconAddFilter: () => import('@Core/components/Icons/Actions/IconAddFilter'),
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .template-grid-ghost-item {
        $filter: &;

        position: fixed;
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        box-sizing: border-box;
        pointer-events: none;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;
    }

    .container {
        display: grid;
        grid-column-gap: 8px;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        align-items: center;
        color: $WHITE;
        font: $FONT_BOLD_12_16;
    }
</style>
