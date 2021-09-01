/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionIconButton
        :options="options"
        :size="tinySize"
        :dismissible="false"
        :theme="secondaryTheme"
        @focus="onFocus">
        <template #icon="{ color }">
            <IconArrowDropdown
                :fill-color="color"
                :state="arrowIconState" />
        </template>
        <template #option="{ option }">
            <RichTextEditorButton
                :extension="option"
                :is-active="isActive"
                :commands="commands" />
        </template>
    </ActionIconButton>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import RichTextEditorButton from '@UI/components/RichTextEditor/Button/RichTextEditorButton';

export default {
    name: 'RichTextEditorActionIconButton',
    components: {
        RichTextEditorButton,
    },
    props: {
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
        },
        /**
         * Determines whether RTE action button is active or not
         */
        isActive: {
            type: Object,
            required: true,
        },
        /**
         * Data model of all RTE commands
         */
        commands: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
    },
    methods: {
        onFocus(isFocused) {
            this.isFocused = isFocused;
        },
    },
};
</script>
