/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconButton
        :size="tinySize"
        :theme="secondaryTheme"
        @click.native="commandCallback">
        <template #icon>
            <Component
                :is="iconComponent"
                :fill-color="iconFillColor" />
        </template>
    </IconButton>
</template>

<script>
import { capitalizeAndConcatenationArray } from '@Core/models/stringWrapper';
import { SIZE, THEME } from '@Core/defaults/theme';
import { GREEN, GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import IconButton from '@Core/components/Buttons/IconButton';

export default {
    name: 'RichTextEditorActionButton',
    components: {
        IconButton,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        isActive: {
            type: Object,
            required: true,
        },
        commandCallback: {
            type: Function,
            required: true,
        },
    },
    computed: {
        iconComponent() {
            return () => import(`@Core/components/Icons/Editor/Icon${capitalizeAndConcatenationArray(this.name.split('_'))}`);
        },
        iconFillColor() {
            return this.isSelected ? GREEN : GRAPHITE;
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        isSelected() {
            return this.isActive[this.name]();
        },
    },
};
</script>
