/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="title"
        :size="smallSize"
        :theme="theme"
        :options="mappedOptions"
        @input="onSelectBatchAction">
        <template #append="{ color, focused }">
            <div
                v-if="selectedRowsCount > 0"
                class="selected-rows-badge"
                v-text="selectedRowsCount" />
            <IconArrowDropdown
                :fill-color="color"
                :state="focused ? arrow.UP : arrow.DOWN" />
        </template>
        <template #option="{ option }">
            <ListElementDescription>
                <ListElementTitle
                    :title="option.label"
                    :size="smallSize" />
            </ListElementDescription>
        </template>
        <template #default>
            <slot />
        </template>
    </ActionButton>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'BatchActionsButton',
    props: {
        highlighted: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        selectedRowsCount: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        title() {
            return this.$t('@BatchActions.batchAction.components.BatchActionsButton.title');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        theme() {
            return this.highlighted ? THEME.PRIMARY : THEME.SECONDARY;
        },
        arrow() {
            return ARROW;
        },
        mappedOptions() {
            return this.options.map(option => ({
                ...option,
                disabled: !this.selectedRowsCount,
            }));
        },
    },
    methods: {
        onSelectBatchAction(option) {
            this.$emit('action', option);
        },
    },
};
</script>

<style lang="scss" scoped>
    .selected-rows-badge {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 16px;
        min-width: 16px;
        padding: 0 4px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color: $GREEN_DARK;
        color: $WHITE;
        font: $FONT_SEMI_BOLD_10_12;
    }
</style>
