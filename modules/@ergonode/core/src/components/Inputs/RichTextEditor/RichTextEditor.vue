/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="styleComponent"
        ref="activator"
        :style="{height, flexBasis: height }"
        :height="height"
        :focused="isFocused"
        :error="isError"
        :data-cy="dataCy"
        :disabled="disabled"
        :alignment="alignment"
        :size="size"
        :details-label="informationLabel"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp">
        <template #activator>
            <RichTextEditorMenuBubble
                v-if="!disabled"
                :editor="editor"
                ref="menuBubble"
                @active="onMenuBubbleActive" />
            <slot #prepand />
            <InputController :size="size">
                <div class="rich-text-editor">
                    <VerticalFixedScroll>
                        <EditorContent
                            class="rich-text-editor__content"
                            ref="editorContent"
                            :editor="editor" />
                    </VerticalFixedScroll>
                    <RichTextEditorMenu
                        v-if="isSolidType && isFocused"
                        :type="type"
                        :editor-width="editorWidth"
                        :editor="editor" />
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
        <RichTextEditorMenu
            v-if="!isSolidType"
            ref="menu"
            :type="type"
            :editor="editor" />
        <template #details>
            <slot name="details" />
        </template>
    </Component>
</template>

<script>
import InputController from '@Core/components/Inputs/InputController';
import InputLabel from '@Core/components/Inputs/InputLabel';
import RichTextEditorMenu from '@Core/components/Inputs/RichTextEditor/Menu/RichTextEditorMenu';
import RichTextEditorMenuBubble from '@Core/components/Inputs/RichTextEditor/MenuBubble/RichTextEditorMenuBubble';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
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
        RichTextEditorMenu,
        RichTextEditorMenuBubble,
        EditorContent,
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
        height: {
            type: String,
            default: 'unset',
        },
        alignment: {
            type: String,
            default: ALIGNMENT.LEFT,
            validator: value => Object.values(ALIGNMENT).indexOf(value) !== -1,
        },
        type: {
            type: String,
            default: INPUT_TYPE.SOLID,
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
        isSolidType() {
            return this.type === INPUT_TYPE.SOLID;
        },
        styleComponent() {
            return () => import(`@Core/components/Inputs/Input${toCapitalize(this.type)}Style`);
        },
        isError() {
            return Boolean(this.errorMessages);
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
    },
    watch: {
        disabled() {
            this.editor.setOptions({
                editable: !this.disabled,
            });
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
        onMenuBubbleActive(isActive) {
            if (!this.isFocused) {
                this.isFocused = isActive;
            }
        },
        onFocus({
            event,
        }) {
            if (this.disabled) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }

            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;

            if (!this.disabled) {
                this.$emit('blur', this.editor.getHTML());
            }
        },
        onMouseDown(event) {
            if (this.disabled) {
                return;
            }

            window.requestAnimationFrame(() => {
                this.editorWidth = this.$refs.editorContent.$el.offsetWidth;
            });

            const isClickedInsideEditor = this.$refs.editorContent.$el.contains(event.target);

            if (!isClickedInsideEditor) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onMouseUp() {
            if (this.disabled) {
                return;
            }

            this.editor.focus();
            this.isFocused = true;
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
        box-sizing: border-box;

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
