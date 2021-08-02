/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionIconButton
        :options="options"
        :size="tinySize"
        :dismissible="false"
        :theme="secondaryTheme">
        <template #icon="{ color }">
            <IconArrowDropdown :fill-color="color" />
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
    computed: {
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
