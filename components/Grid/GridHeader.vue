/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-header">
        <div class="header-container">
            <span
                class="grid-header__title font--medium-l-3"
                v-text="title" />
            <div class="divider-container">
                <Divider vertical />
            </div>
        </div>
        <div class="layout-configuration-container">
            <div class="divider-container">
                <Divider vertical />
            </div>
            <div class="actions-container">
                <IconFabButton
                    theme="secondary"
                    icon-path="Others/IconGrid"
                    :is-stateable="true"
                    :is-selected="layout === gridLayouts.GRID"
                    @select="() => onSelectLayout(gridLayouts.GRID)" />
                <IconFabButton
                    theme="secondary"
                    icon-path="Others/IconTable"
                    :is-stateable="true"
                    :is-selected="layout === gridLayouts.TABLE"
                    @select="() => onSelectLayout(gridLayouts.TABLE)" />
            </div>
            <div class="divider-container">
                <Divider vertical />
            </div>
            <div class="actions-container">
                <IconFabButton
                    theme="secondary"
                    icon-path="Others/IconListSmall"
                    :is-stateable="true"
                    :is-selected="rowHeight === rowHeights.SMALL"
                    @select="() => onSelectRowHeight(rowHeights.SMALL)" />
                <IconFabButton
                    theme="secondary"
                    icon-path="Others/IconListMedium"
                    :is-stateable="true"
                    :is-selected="rowHeight === rowHeights.MEDIUM"
                    @select="() => onSelectRowHeight(rowHeights.MEDIUM)" />
                <IconFabButton
                    theme="secondary"
                    icon-path="Others/IconListLarge"
                    :is-stateable="true"
                    :is-selected="rowHeight === rowHeights.LARGE"
                    @select="() => onSelectRowHeight(rowHeights.LARGE)" />
            </div>
        </div>
    </div>
</template>

<script>
import { ROW_HEIGHT, GRID_LAYOUT } from '~/defaults/grid/main';

export default {
    name: 'GridHeader',
    components: {
        Divider: () => import('~/components/Dividers/Divider'),
        IconFabButton: () => import('~/components/Buttons/IconFabButton'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT.SMALL,
        },
        layout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
        },
    },
    computed: {
        rowHeights() {
            return ROW_HEIGHT;
        },
        gridLayouts() {
            return GRID_LAYOUT;
        },
    },
    methods: {
        onSelectRowHeight(height) {
            this.$emit('rowHeightChange', height);
        },
        onSelectLayout(layout) {
            this.$emit('layoutChange', layout);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header {
        display: flex;
        flex-shrink: 0;
        justify-content: space-between;
        border: 1px solid $GREY;
        padding: 0 6px 0 16px;
        box-sizing: border-box;
        background-color: $WHITE;

        &__title {
            display: flex;
            align-items: center;
            padding: 12px 0;
            color: $GRAPHITE_DARK;
        }
    }

    .header-container, .layout-configuration-container {
        display: grid;
        grid-auto-flow: column;
    }

    .header-container {
        grid-column-gap: 16px;
    }

    .layout-configuration-container {
        grid-column-gap: 8px;
    }

    .divider-container {
        display: flex;
        padding: 16px 0;
    }

    .actions-container {
        display: flex;
        align-items: center;
    }
</style>
