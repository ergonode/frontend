/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionButton
        :title="actionButtonTitle"
        :size="smallSize"
        :theme="theme"
        :options="options"
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
import ActionButton from '@UI/components/ActionButton/ActionButton';
import IconArrowDropdown from '@UI/components/Icons/Arrows/IconArrowDropdown';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';

export default {
    name: 'BatchActionButton',
    components: {
        ListElementTitle,
        ListElementDescription,
        ActionButton,
        IconArrowDropdown,
    },
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
        actionButtonTitle() {
            return 'Actions';
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
