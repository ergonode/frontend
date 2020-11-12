/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid__ghost-item">
        <div class="ghost-item__info">
            <IconAddFilter :fill-color="whiteColor" />
            ADD {{ contextName || 'ITEM' }}
        </div>
    </div>
</template>
<script>
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';

export default {
    name: 'TemplateGridGhostItem',
    components: {
        IconAddFilter,
    },
    props: {
        contextName: {
            type: String,
            default: '',
        },
    },
    computed: {
        whiteColor() {
            return WHITE;
        },

    },
};
</script>

<style lang="scss" scoped>
    .grid__ghost-item {
        display: flex;
        grid-column: 1 / 3;
        justify-content: flex-start;
        align-items: center;
        padding-left: 12px;
        background-color: $GREEN;
        box-shadow: $ELEVATOR_HOLE;

        .ghost-item__info {
            display: grid;
            grid-column-gap: 8px;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            align-items: center;
            color: $WHITE;
            font: $FONT_BOLD_12_16;
            text-transform: uppercase;
        }

        &::before {
            position: absolute;
            left: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: $GREEN;
            content: "";
        }
    }
</style>
