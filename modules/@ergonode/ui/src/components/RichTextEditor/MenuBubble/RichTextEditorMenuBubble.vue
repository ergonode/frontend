/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <EditorMenuBubble
        :editor="editor"
        @hide="onHideLinkMenu">
        <template #default="{ commands, isActive, getMarkAttrs, menu }">
            <div
                class="menububble"
                :class="{ 'menububble--active': menu.isActive }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
                <form
                    v-if="linkMenuIsActive"
                    class="menububble__form"
                    @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                    <input
                        class="menububble__input"
                        type="text"
                        v-model="linkUrl"
                        placeholder="https://"
                        ref="linkInput"
                        @keydown.esc="onHideLinkMenu">
                    <Button
                        class="menububble__remove-button"
                        type="button"
                        @click="setLinkUrl(commands.link, null)"
                        @mouseenter="isHovered = true"
                        @mouseleave="isHovered = false">
                        <IconFilledClose :fill-color="removeLinkFillColor" />
                    </Button>
                </form>
                <Button
                    v-else
                    class="menububble__button"
                    @click="onShowLinkMenu(getMarkAttrs)">
                    <IconLink :fill-color="whiteColor" />
                    <span>{{ isActive.link() ? 'Update Link' : 'Add Link' }}</span>
                </Button>
            </div>
        </template>
    </EditorMenuBubble>
</template>

<script>
import {
    GRAPHITE,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconLink from '@UI/components/Icons/Editor/IconLink';
import {
    EditorMenuBubble,
} from 'tiptap';

export default {
    name: 'RichTextEditorMenuBubble',
    components: {
        EditorMenuBubble,
        IconLink,
    },
    props: {
        /**
         * RTE data model
         */
        editor: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            linkUrl: null,
            linkMenuIsActive: false,
            isHovered: false,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        removeLinkFillColor() {
            return this.isHovered ? WHITE : GRAPHITE;
        },
    },
    methods: {
        onShowLinkMenu(getMarkAttrs) {
            this.linkUrl = getMarkAttrs('link').href;
            this.linkMenuIsActive = true;
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            });
            this.$emit('active', true);
        },
        onHideLinkMenu() {
            this.linkUrl = null;
            this.linkMenuIsActive = false;
            this.$emit('active', false);
        },
        setLinkUrl(command, url) {
            command({
                href: url,
            });
            this.onHideLinkMenu();
        },
    },
};
</script>

<style lang="scss" scoped>
    .menububble {
        position: absolute;
        z-index: $Z_INDEX_MAX;
        display: flex;
        padding: 4px;
        transition:
            opacity,
            visibility 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        transform: translateX(-50%);
        visibility: hidden;

        &--active {
            opacity: 1;
            visibility: visible;
        }

        &__form {
            display: flex;
            align-items: center;
            padding: 4px;
            background-color: $GRAPHITE_COAL;
        }

        &__button {
            display: flex;
            align-items: center;
            height: 26px;
            border: none;
            padding: 0 8px;
            box-sizing: border-box;
            background-color: $GRAPHITE_COAL;
            color: $WHITE;
            font: $FONT_SEMI_BOLD_10_12;
            cursor: pointer;
            outline: none;

            & > span {
                margin-left: 4px;
            }
        }

        &__remove-button {
            display: flex;
            align-items: center;
            border: none;
            padding: 0;
            outline: none;
            background-color: $GRAPHITE_COAL;
            cursor: pointer;
        }

        &__input {
            border: none;
            background-color: transparent;
            color: $WHITE;
            font: $FONT_MEDIUM_12_16;
            margin-right: 4px;
            outline: none;

            &::placeholder {
                font: $FONT_MEDIUM_12_16;
            }
        }
    }
</style>
