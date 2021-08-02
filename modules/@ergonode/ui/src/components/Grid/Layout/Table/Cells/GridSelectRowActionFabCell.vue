/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionFab
        :theme="secondaryPlainTheme"
        :size="smallSize"
        :options="items"
        :disabled="disabled"
        @input="onSelectValue">
        <template #option="{ option }">
            <ListElementDescription>
                <ListElementTitle
                    :size="smallSize"
                    :title="option.text" />
            </ListElementDescription>
        </template>
    </ActionFab>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridSelectRowActionFabCell',
    props: {
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        items() {
            return [
                {
                    text: 'Select all',
                    action: this.onSelectAll,
                },
                {
                    text: 'Select all on this page',
                    action: this.onSelectAllOnThisPage,
                },
                {
                    text: 'Deselect all',
                    action: this.onDeselectAll,
                },
                {
                    text: 'Deselect all on this page',
                    action: this.onDeselectAllOnThisPage,
                },
            ];
        },
    },
    methods: {
        onSelectValue(value) {
            value.action();
        },
        onSelectAll() {
            this.$emit('select-all-global');
        },
        onSelectAllOnThisPage() {
            this.$emit('select-all-on-this-page');
        },
        onDeselectAll() {
            this.$emit('deselect-all-global');
        },
        onDeselectAllOnThisPage() {
            this.$emit('deselect-all-on-this-page');
        },
    },
};
</script>
