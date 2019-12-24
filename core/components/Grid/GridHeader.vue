/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-header">
        <div class="header-container">
            <span
                class="grid-header__title font--medium-16-24"
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
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onSelectLayout(gridLayouts.GRID)">
                    <template #icon="{ fillColor }">
                        <IconGrid
                            :fill-color="layout === gridLayouts.GRID
                                ? greenColor
                                : fillColor" />
                    </template>
                </Fab>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onSelectLayout(gridLayouts.TABLE)">
                    <template #icon="{ fillColor }">
                        <IconTable
                            :fill-color="layout === gridLayouts.TABLE
                                ? greenColor
                                : fillColor" />
                    </template>
                </Fab>
            </div>
            <div class="divider-container">
                <Divider vertical />
            </div>
            <div class="actions-container">
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onSelectRowHeight(rowHeights.SMALL)">
                    <template #icon="{ fillColor }">
                        <IconListSmall
                            :fill-color="rowHeight === rowHeights.SMALL
                                ? greenColor
                                : fillColor" />
                    </template>
                </Fab>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onSelectRowHeight(rowHeights.MEDIUM)">
                    <template #icon="{ fillColor }">
                        <IconListMedium
                            :fill-color="rowHeight === rowHeights.MEDIUM
                                ? greenColor
                                : fillColor" />
                    </template>
                </Fab>
                <Fab
                    :theme="secondaryTheme"
                    @click.native="onSelectRowHeight(rowHeights.LARGE)">
                    <template #icon="{ fillColor }">
                        <IconListLarge
                            :fill-color="rowHeight === rowHeights.LARGE
                                ? greenColor
                                : fillColor" />
                    </template>
                </Fab>
            </div>
        </div>
    </div>
</template>

<script>
import { THEMES } from '~/defaults/buttons';
import { ROW_HEIGHT, GRID_LAYOUT } from '~/defaults/grid';
import { GREEN } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'GridHeader',
    components: {
        Divider: () => import('~/core/components/Dividers/Divider'),
        Fab: () => import('~/core/components/Buttons/Fab'),
        IconGrid: () => import('~/components/Icon/Others/IconGrid'),
        IconTable: () => import('~/components/Icon/Others/IconTable'),
        IconListSmall: () => import('~/components/Icon/Others/IconListSmall'),
        IconListMedium: () => import('~/components/Icon/Others/IconListMedium'),
        IconListLarge: () => import('~/components/Icon/Others/IconListLarge'),
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
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        greenColor() {
            return GREEN;
        },
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
