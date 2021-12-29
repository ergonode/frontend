/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot name="prepend" />
        <GridHeaderSettings>
            <template #actions>
                <slot name="actions" />
            </template>
            <template #configuration>
                <template v-if="layoutActivators.length > 1">
                    <Component
                        v-for="activator in layoutActivators"
                        :key="activator.key"
                        :is="activator.component"
                        :selected="layout === activator.key"
                        :data-cy="activator.dataCy"
                        @active="onLayoutActivate" />
                </template>
                <Fab
                    :theme="theme.SECONDARY"
                    @click.native="onShowModal">
                    <template #icon="{ color }">
                        <IconSettings :fill-color="color" />
                    </template>
                </Fab>
                <slot name="configuration" />
            </template>
        </GridHeaderSettings>
        <GridSettingsModalForm
            v-if="isSettingsModal"
            :layout-configs="layoutConfigs"
            @close="onCloseModal"
            @apply="onApplySettings" />
        <slot name="append" />
    </div>
</template>

<script>
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridHeader',
    props: {
        /**
         * Configuration of layouts
         */
        layoutConfigs: {
            type: Object,
            required: true,
        },
        /**
         * The available layouts
         */
        layoutActivators: {
            type: Array,
            required: true,
        },
        /**
         * Current selected grid layout
         */
        layout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
        },
    },
    data() {
        return {
            isSettingsModal: false,
        };
    },
    computed: {
        classes() {
            return [
                'grid-header',
            ];
        },
        theme() {
            return THEME;
        },
    },
    methods: {
        onLayoutActivate(layout) {
            this.$emit('layout-change', layout);
        },
        onShowModal() {
            this.isSettingsModal = true;
        },
        onCloseModal() {
            this.isSettingsModal = false;
        },
        onApplySettings(payload) {
            this.isSettingsModal = false;

            this.$emit('apply-settings', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header {
        position: relative;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
        box-sizing: border-box;
        background-color: $WHITE;
    }
</style>
