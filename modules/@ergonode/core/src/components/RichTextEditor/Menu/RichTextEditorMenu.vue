/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <EditorMenuBar :editor="editor">
        <template #default="{ commands, isActive }">
            <div
                :class="classes"
                :style="styles">
                <RichTextEditorButton
                    v-for="(extension, index) in visibleExtensions"
                    :key="`${extension.name}|${index}`"
                    :extension="extension"
                    :is-active="isActive"
                    :commands="commands" />
                <RichTextEditorActionIconButton
                    v-if="hiddenExtensions.length"
                    :options="hiddenExtensions"
                    :is-active="isActive"
                    :commands="commands" />
            </div>
        </template>
    </EditorMenuBar>
</template>

<script>
import RichTextEditorActionIconButton from '@Core/components/RichTextEditor/Button/RichTextEditorActionIconButton';
import RichTextEditorButton from '@Core/components/RichTextEditor/Button/RichTextEditorButton';
import {
    EXTENSION_BUTTON_WIDTH,
    EXTENSIONS,
} from '@Core/defaults/inputs/rich-text-editor';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import {
    EditorMenuBar,
} from 'tiptap';

export default {
    name: 'RichTextEditorMenu',
    components: {
        RichTextEditorButton,
        RichTextEditorActionIconButton,
        EditorMenuBar,
    },
    props: {
        editor: {
            type: Object,
            default: null,
        },
        editorWidth: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            default: INPUT_TYPE.UNDERLINE,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
    },
    computed: {
        classes() {
            return [
                'rich-text-editor-menu',
                `rich-text-editor-menu--${this.type}`,
            ];
        },
        styles() {
            return {
                gridTemplateColumns: `repeat(${this.maxVisibleExtensions}, max-content)`,
            };
        },
        maxVisibleExtensions() {
            const max = Math.floor(this.editorWidth / EXTENSION_BUTTON_WIDTH);

            return max === EXTENSIONS.length ? max : max - 1;
        },
        visibleExtensions() {
            return EXTENSIONS.slice(0, this.maxVisibleExtensions);
        },
        hiddenExtensions() {
            return EXTENSIONS.slice(this.maxVisibleExtensions, EXTENSIONS.length);
        },
    },
};
</script>

<style lang="scss" scoped>
    .rich-text-editor-menu {
        z-index: $Z_INDEX_LVL_2;
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 3px;
        padding: 3px;
        background-color: $WHITESMOKE;
        box-shadow: $ELEVATOR_2_DP;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

        &--solid {
            margin: 8px 0 4px;
        }

        &--underline {
            margin-top: 12px;
        }
    }
</style>
