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
                :width="18"
                :height="18"
                :fill-color="iconFillColor" />
        </template>
    </IconButton>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { GREEN, GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import IconButton from '@Core/components/Buttons/IconButton';

export default {
    name: 'RichTextEditorActionButton',
    components: {
        IconButton,
    },
    props: {
        isActive: {
            type: Object,
            required: true,
        },
        extension: {
            type: Object,
            required: true,
        },
        commands: {
            type: Object,
            required: true,
        },
    },
    computed: {
        iconComponent() {
            return () => import(`@Core/components/Icons/Editor/${this.extension.icon}`);
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
        commandCallback() {
            if (this.commands[this.extension.name]) {
                if (this.params) {
                    return this.commands[this.extension.name](this.extension.params);
                }

                return this.commands[this.extension.name];
            }

            return null;
        },
        isSelected() {
            if (this.isActive[this.extension.name]) {
                if (this.params) {
                    return this.isActive[this.extension.name](this.extension.params);
                }

                return this.isActive[this.extension.name]();
            }

            return false;
        },
    },
};
</script>
