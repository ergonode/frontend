/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconButton
        :size="tinySize"
        :theme="secondaryTheme"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousedown.native.prevent="commandCallback">
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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'RichTextEditorButton',
    props: {
        /**
         * Determines whether RTE action button is active or not
         */
        isActive: {
            type: Object,
            required: true,
        },
        /**
         * Chosen extension of RTE action
         */
        extension: {
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
            isHovered: false,
        };
    },
    computed: {
        iconComponent() {
            return () => import(`@UI/components/Icons/Editor/${this.extension.icon}`);
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
                if (this.extension.params) {
                    return () => this.commands[this.extension.name](this.extension.params);
                }

                return this.commands[this.extension.name];
            }

            return null;
        },
        isSelected() {
            if (this.isActive[this.extension.name]) {
                if (this.extension.params) {
                    return this.isActive[this.extension.name](this.extension.params);
                }

                return this.isActive[this.extension.name]();
            }

            return false;
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
    },
};
</script>
