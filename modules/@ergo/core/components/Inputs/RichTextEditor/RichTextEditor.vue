/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['rich-text-editor', richTextEditorStateClasses]"
        ref="editor">
        <fieldset class="rich-text-editor__fieldset">
            <legend
                class="rich-text-editor__label"
                v-text="label" />
        </fieldset>
        <div class="rich-text-editor__activator">
            <slot #prepand />
            <div class="rich-text-editor__wrapper">
                <EditorMenuBar :editor="editor">
                    <template #default="{ commands, isActive }">
                        <div class="rich-text-editor__menu">
                            <RichTextEditorActionButton
                                v-for="action in actionableExtensions"
                                :key="action.name"
                                :name="action.name"
                                :is-active="isActive"
                                :command-callback="commands[action.name]" />
                        </div>
                    </template>
                </EditorMenuBar>
                <VerticalFixedScroll>
                    <EditorContent
                        class="rich-text-editor__content"
                        :editor="editor" />
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
    </div>
</template>

<script>
import { Editor, EditorMenuBar, EditorContent } from 'tiptap';
import { ListItem, Placeholder } from 'tiptap-extensions';
import RichTextEditorActionButton from '@Core/components/Inputs/RichTextEditor/Button/RichTextEditorActionButton';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'RichTextEditor',
    components: {
        EditorMenuBar,
        EditorContent,
        RichTextEditorActionButton,
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
        };
    },
    computed: {
        richTextEditorStateClasses() {
            return {
                'rich-text-editor--has-label': Boolean(this.label),
            };
        },
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                ...this.actionableExtensions,
                new ListItem(),
                new Placeholder({
                    emptyEditorClass: 'is-editor-empty',
                    emptyNodeClass: 'is-empty',
                    emptyNodeText: this.placeholder,
                    showOnlyWhenEditable: true,
                    showOnlyCurrent: true,
                }),
            ],
            content: this.value,
            onBlur: () => {
                this.$emit('blur', this.editor.getHTML());
            },
        });
    },
    beforeDestroy() {
        this.editor.destroy();
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

        &__activator {
            display: flex;
            flex: 1 1 auto;
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
            padding: 12px;
        }

        &__label {
            background-color: $WHITE;
            color: $GRAPHITE_LIGHT;
            font: $FONT_MEDIUM_12_16;
        }

        &--has-label &__menu {
            padding: 6px 0 8px;
        }

        &:not(&--has-label) &__menu {
            padding: 2px 0 8px;
        }

        &__menu {
            display: flex;
            flex-wrap: wrap;
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
            height: 100%;
            overflow: auto;
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
        }
    }
</style>
