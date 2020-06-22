/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="styleComponent"
        ref="editor"
        :focused="isFocused"
        :error="isError"
        :disabled="disabled"
        :alignment="alignment"
        :size="size"
        :details-label="informationLabel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp">
        <template #activator>
            <RichTextEditorMenuBubble
                v-if="isFocused"
                :editor="editor"
                @active="onMenuBubbleActive" />
            <slot #prepand />
            <InputController :size="size">
                <div class="rich-text-editor">
                    <VerticalFixedScroll>
                        <EditorContent
                            class="rich-text-editor__content"
                            :editor="editor"
                            ref="editorContent" />
                    </VerticalFixedScroll>
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
                <InputLabel
                    v-if="label"
                    :style="{ top: 0 }"
                    :for="associatedLabel"
                    :required="required"
                    :size="size"
                    :floating="true"
                    :focused="isFocused"
                    :disabled="disabled"
                    :error="isError"
                    :label="label" />
                <template #append>
                    <slot name="append" />
                    <ErrorHint
                        v-if="isError"
                        :hint="errorMessages" />
                </template>
            </InputController>
        </template>
        <template #details>
            <slot name="details" />
        </template>
    </Component>
</template>

<script>
import InputController from '@Core/components/Inputs/InputController';
import InputLabel from '@Core/components/Inputs/InputLabel';
import RichTextEditorActionIconButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorActionIconButton';
import RichTextEditorButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorButton';
import RichTextEditorMenuBubble from '@Core/components/Inputs/RichTextEditor/MenuBubble/RichTextEditorMenuBubble';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import {
    EXTENSION_BUTTON_WIDTH,
    EXTENSIONS,
} from '@Core/defaults/inputs/rich-text-editor';
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    Editor,
    EditorContent,
    EditorMenuBar,
} from 'tiptap';
import {
    Blockquote,
    Bold,
    BulletList,
    Heading,
    History,
    HorizontalRule,
    Italic,
    Link,
    ListItem,
    OrderedList,
    Placeholder,
    Strike,
    Underline,
} from 'tiptap-extensions';

export default {
    name: 'RichTextEditor',
    components: {
        InputController,
        InputLabel,
        RichTextEditorMenuBubble,
        RichTextEditorActionIconButton,
        EditorMenuBar,
        EditorContent,
        RichTextEditorButton,
        VerticalFixedScroll,
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    mixins: [
        associatedLabelMixin,
    ],
    props: {
        value: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        type: {
            type: String,
            default: INPUT_TYPE.UNDERLINE,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        label: {
            type: String,
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        autofocus: {
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
            isFocused: false,
            editor: null,
            editorWidth: 0,
        };
    },
    computed: {
        styleComponent() {
            return () => import(`@Core/components/Inputs/Input${toCapitalize(this.type)}Style`);
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        informationLabel() {
            return this.errorMessages || this.hint;
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
                new Heading({
                    levels: [
                        1,
                        2,
                        3,
                    ],
                }),
                new Placeholder({
                    emptyEditorClass: 'is-editor-empty',
                    emptyNodeClass: 'is-empty',
                    emptyNodeText: this.placeholder,
                    showOnlyWhenEditable: true,
                    showOnlyCurrent: true,
                }),
            ],
            autofocus: this.autofocus,
            content: this.value,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        });

        this.$nextTick(() => {
            window.requestAnimationFrame(() => {
                const paddingOffset = 24;

                this.editorWidth = this.$el.querySelector('.rich-text-editor').offsetWidth - paddingOffset;
            });
        });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        onMenuBubbleActive(isActive) {
            this.isFocused = isActive;
        },
        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
            this.$emit('blur', this.editor.getHTML());
        },
        onMouseDown(event) {
            if ((this.$refs.menu.$el.contains(event.target)
                || !this.$refs.editorContent.$el.contains(event.target))) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp() {
            this.editor.focus();
            this.isFocused = true;
        },
    },
};
</script>

<style lang="scss">
    .rich-text-editor {
        $editor: &;

        position: relative;
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        padding-bottom: 38px;
        box-sizing: border-box;
        background-color: $WHITE;

        &__menu {
            position: absolute;
            bottom: 0;
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 3px;
            padding: 3px;
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
            opacity: 0;
        }

        &__content {
            position: relative;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            outline: unset;
            font: $FONT_MEDIUM_14_20;

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

            blockquote {
                border-left: 3px solid rgba($GRAPHITE_COAL, 0.1);
                color: rgba($GRAPHITE_COAL, 0.8);
                padding-left: 0.8rem;
                font-style: italic;

                p {
                    margin: 0;
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

            em {
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
            #{$editor}__menu {
                opacity: 1;
            }
        }
    }
</style>
