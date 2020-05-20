/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionIconButton
        :options="options"
        :size="tinySize"
        :theme="secondaryTheme">
        <template #icon="{ color }">
            <IconArrowDropDown :fill-color="color" />
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
import { SIZE, THEME } from '@Core/defaults/theme';
import ActionIconButton from '@Core/components/Buttons/ActionIconButton';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import RichTextEditorButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorButton';

export default {
    name: 'RichTextEditorActionIconButton',
    components: {
        ActionIconButton,
        IconArrowDropDown,
        RichTextEditorButton,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        isActive: {
            type: Object,
            required: true,
        },
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
