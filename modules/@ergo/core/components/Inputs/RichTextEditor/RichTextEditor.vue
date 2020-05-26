/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="richTextEditorClasses"
        ref="editor"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp">
        <fieldset
            v-if="solid"
            class="rich-text-editor__fieldset">
            <legend
                class="rich-text-editor__label"
                v-text="label" />
        </fieldset>
        <RichTextEditorMenuBubble
            v-if="editor"
            :editor="editor" />
        <div class="rich-text-editor__activator">
            <slot #prepand />
            <div class="rich-text-editor__wrapper">
                <VerticalFixedScroll>
                    <EditorContent
                        class="rich-text-editor__content"
                        :editor="editor"
                        ref="editorContent" />
                </VerticalFixedScroll>
            </div>
            <div class="rich-text-editor__append">
                <slot #append />
                <ErrorHint
                    v-if="errorMessages"
                    :hint="errorMessages" />
                <InfoHint
                    v-if="description"
                    :hint="description" />
            </div>
        </div>
        <EditorMenuBar
            :editor="editor"
            ref="menu">
            <template #default="{ commands, isActive }">
                <div class="rich-text-editor__menu">
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
    </div>
</template>

<script>
import {
    Editor,
    EditorMenuBar,
    EditorContent,
} from 'tiptap';
import {
    ListItem,
    Placeholder,
    Blockquote,
    OrderedList,
    BulletList,
    Bold,
    Italic,
    Underline,
    HorizontalRule,
    Strike,
    Link,
    Heading,
    History,
} from 'tiptap-extensions';
import {
    EXTENSION_BUTTON_WIDTH,
    EXTENSIONS,
} from '@Core/defaults/inputs/rich-text-editor';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import RichTextEditorButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorButton';
import RichTextEditorMenuBubble from '@Core/components/Inputs/RichTextEditor/MenuBubble/RichTextEditorMenuBubble';
import RichTextEditorActionIconButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorActionIconButton';

export default {
    name: 'RichTextEditor',
    components: {
        RichTextEditorMenuBubble,
        RichTextEditorActionIconButton,
        EditorMenuBar,
        EditorContent,
        RichTextEditorButton,
        VerticalFixedScroll,
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    props: {
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        solid: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: 'Placeholder',
        },
        actionableExtensions: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            editor: null,
            editorWidth: 0,
        };
    },
    computed: {
        richTextEditorClasses() {
            return [
                'rich-text-editor',
                {
                    solid: this.solid,
                },
            ];
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
    mounted() {
        const paddingOffset = 24;

        this.editorWidth = this.$refs.editor.offsetWidth - paddingOffset;

        this.editor = new Editor({
            extensions: [
                new Bold(),
                new Italic(),
                new Underline(),
                new Blockquote(),
                new OrderedList(),
                new HorizontalRule(),
                new BulletList(),
                new Strike(),
                new Link(),
                new ListItem(),
                new History(),
                new Heading({ levels: [1, 2, 3] }),
                new Placeholder({
                    emptyEditorClass: 'is-editor-empty',
                    emptyNodeClass: 'is-empty',
                    emptyNodeText: this.placeholder,
                    showOnlyWhenEditable: true,
                    showOnlyCurrent: true,
                }),
            ],
            content: this.value,
            onBlur: this.onBlur,
        });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        onBlur() {
            this.$emit('blur', this.editor.getHTML());
        },
        onMouseDown(event) {
            if (!this.linkMenuIsActive
                && (this.$refs.menu.$el.contains(event.target)
                    || !this.$refs.editorContent.$el.contains(event.target))) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp() {
            this.editor.focus();
        },
    },
};
</script>

<style lang="scss">
    .rich-text-editor {
        $editor: &;

        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;

        &.solid {
            #{$editor}__menu {
                position: absolute;
                left: 12px;
                bottom: 12px;
                right: 12px;
                transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                opacity: 0;
            }

            #{$editor}__content {
                margin: 10px 0 30px;
            }
        }

        &:not(.solid) {
            box-shadow: $ELEVATOR_6_DP;

            #{$editor}__menu {
                margin: 0 12px 12px;
            }

            #{$editor}__activator {
                &::after {
                    position: absolute;
                    left: 12px;
                    bottom: 12px;
                    right: 12px;
                    height: 2px;
                    background-color: $GREEN;
                    transform-origin: left;
                    transform: scaleX(0);
                    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                    content: "";
                    will-change: transform;
                }
            }
        }

        &__activator {
            position: relative;
            display: flex;
            flex: 1 1 auto;
        }

        &__wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 12px;
        }

        &__label {
            background-color: $WHITE;
            color: $GRAPHITE_LIGHT;
            font: $FONT_MEDIUM_12_16;
        }

        &__menu {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 3px;
            padding: 3px;
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__fieldset {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: $BORDER_1_GREY;
            padding: 10px;
            box-sizing: border-box;
        }

        &__append {
            display: grid;
            grid-auto-flow: column;
            justify-items: center;
            align-items: center;
            margin: 0 6px;
        }

        &__content {
            position: relative;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            outline: unset;

            p.is-editor-empty:first-child::before {
                float: left;
                height: 0;
                opacity: 0.4;
                color: $GRAPHITE_DARK;
                pointer-events: none;
                font: $FONT_MEDIUM_14_20;
                content: attr(data-empty-text);
            }

            * {
                caret-color: currentColor;
            }

            pre {
                padding: 0.7rem 1rem;
                border-radius: 5px;
                background-color: $GRAPHITE_COAL;
                color: $WHITE;
                font-size: 0.8rem;
                overflow-x: auto;

                code {
                    display: block;
                }
            }

            p code {
                padding: 0.2rem 0.4rem;
                border-radius: 5px;
                background-color: rgba($GRAPHITE_COAL, 0.1);
                color: rgba($GRAPHITE_COAL, 0.8);
                font: $FONT_BOLD_12_16;
            }

            ul {
                list-style-type: square;
            }

            ol {
                list-style-type: decimal;
            }

            p > em {
                font-style: italic;
            }

            ul,
            ol {
                padding-left: 1rem;
            }

            li > p,
            li > ol,
            li > ul {
                margin: 0;
            }

            a {
                color: inherit;
            }

            .ProseMirror:focus {
                outline: none;
            }
        }

        &:focus-within {
            #{$editor}__fieldset {
                border-color: $GREEN;
                box-shadow: inset 0 0 0 1px $GREEN;
            }

            #{$editor}__label {
                color: $GREEN;
            }

            #{$editor}__menu {
                opacity: 1;
            }

            #{$editor}__activator::after {
                transform: scaleX(1);
            }
        }
    }
</style>
