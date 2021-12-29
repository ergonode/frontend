/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <Component
                :is="styleComponent"
                ref="activator"
                :height="height"
                :focused="isFocused"
                :error="isError"
                :data-cy="dataCy"
                :disabled="disabled"
                :alignment="alignment"
                :size="size"
                :details-label="informationLabel"
                @mousedown="onMouseDown">
                <template #activator>
                    <RichTextEditorMenuBubble
                        v-if="!disabled"
                        :editor="editor"
                        ref="menuBubble" />
                    <InputController>
                        <!--
                            @slot Prepend element - icon recommended
                        -->
                        <slot name="prepend" />
                        <ResizeObserver @resize="onResize">
                            <div :class="classes">
                                <VerticalFixedScroll>
                                    <EditorContent
                                        class="rich-text-editor__content"
                                        ref="editorContent"
                                        :editor="editor" />
                                </VerticalFixedScroll>
                                <RichTextEditorMenu
                                    v-if="isSolidType && isFocused"
                                    :type="type"
                                    :editor="editor"
                                    :editor-width="editorWidth" />
                            </div>
                        </ResizeObserver>
                        <InputLabel
                            v-if="label"
                            :for="uuid"
                            :required="required"
                            :size="size"
                            :floating="true"
                            :focused="isFocused"
                            :disabled="disabled"
                            :error="isError"
                            :label="label" />
                        <!--
                            @slot Append element - icon recommended
                        -->
                        <slot name="append" />
                        <ErrorHint
                            v-if="isError"
                            :hint="errorMessages" />
                    </InputController>
                </template>
                <RichTextEditorMenu
                    v-if="!isSolidType && !disabled"
                    :type="type"
                    :editor="editor"
                    :editor-width="editorWidth" />
                <template #details>
                    <!--
                        @slot Details element - text recommended
                    -->
                    <slot name="details" />
                </template>
            </Component>
        </template>
    </InputUUIDProvider>
</template>

<script>
import {
    ALIGNMENT,
    INPUT_TYPE,
    SIZE,
} from '@Core/defaults/theme';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import InputUnderlineStyle from '@UI/components/Input/InputUnderlineStyle';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import RichTextEditorMenu from '@UI/components/RichTextEditor/Menu/RichTextEditorMenu';
import RichTextEditorMenuBubble from '@UI/components/RichTextEditor/MenuBubble/RichTextEditorMenuBubble';
import {
    Editor,
    EditorContent,
} from 'tiptap';
import {
    Blockquote,
    Bold,
    BulletList,
    HardBreak,
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
        RichTextEditorMenu,
        RichTextEditorMenuBubble,
        EditorContent,
        VerticalFixedScroll,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * Height of the component
         */
        height: {
            type: String,
            default: 'unset',
        },
        /**
         * Alignment of selected value, might be centered or from left
         */
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        /**
         * Determines style of component based on type
         */
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
            validator: value => Object.values(INPUT_TYPE).indexOf(value) !== -1,
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            default: '',
        },
        /**
         * The error messages are messages which comes from validation process
         */
        errorMessages: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component should be focused as it's initialised
         */
        autofocus: {
            type: Boolean,
            default: false,
        },
        /**
         * The placeholder is a helper text for the component
         */
        placeholder: {
            type: String,
            default: 'Placeholder',
        },
        /**
         * Unique identifier for cypress
         */
        dataCy: {
            type: String,
            default: '',
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
        classes() {
            return [
                'rich-text-editor',
                {
                    'rich-text-editor--disabled': this.disabled,
                },
            ];
        },
        styleComponent() {
            if (this.type === INPUT_TYPE.SOLID) {
                return InputSolidStyle;
            }

            return InputUnderlineStyle;
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        isSolidType() {
            return this.type === INPUT_TYPE.SOLID;
        },
    },
    watch: {
        disabled() {
            this.editor.setOptions({
                editable: !this.disabled,
            });
        },
        value() {
            this.editor.setContent(this.value);
        },
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                new Bold(),
                new Italic(),
                new Underline(),
                new HardBreak(),
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
            editable: !this.disabled,
            autofocus: this.autofocus,
            content: this.value,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    methods: {
        onMouseDown(event) {
            if (!this.isFocused && !this.disabled) {
                event.preventDefault();

                this.editor.focus();
            }
        },
        onResize(entry) {
            const {
                width,
            } = entry.contentRect;

            this.editorWidth = width;
        },
        onFocus() {
            if (!this.disabled) {
                this.isFocused = true;
            }
        },
        onBlur() {
            if (!this.disabled) {
                // TODO:
                // It will be fixed in +2.0 tiptap

                let html = this.editor.getHTML();

                if (html === '<p></p>') {
                    html = null;
                }

                this.$emit('blur', html);

                this.isFocused = false;
            }
        },
    },
};
</script>

<style lang="scss">
    .rich-text-editor {
        position: relative;
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        padding: 2px 4px;
        box-sizing: border-box;

        &--disabled {
            color: $GRAPHITE;
        }

        &__content {
            position: relative;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            outline: unset;
            font: $FONT_MEDIUM_14_20;

            p.is-editor-empty:nth-child(1)::before {
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

            h1,
            h2,
            h3,
            p,
            ul,
            ol,
            pre,
            blockquote {
                margin: 1rem 0;

                &:first-child {
                    margin-top: 0;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }

            h1,
            h2,
            h3 {
                line-height: 1.3;
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
    }
</style>
