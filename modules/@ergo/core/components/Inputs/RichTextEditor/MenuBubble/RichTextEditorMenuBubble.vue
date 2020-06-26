/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                    @submit.prevent="setLinkUrl(commands)">
                    <input
                        class="menububble__input"
                        type="text"
                        v-model="linkUrl"
                        placeholder="https://"
                        ref="linkInput"
                        @keydown.esc="onHideLinkMenu">
                    <IconButton
                        :size="tinySize"
                        :theme="secondaryTheme"
                        @click.native="onHideLinkMenu">
                        <template #icon>
                            <IconClose />
                        </template>
                    </IconButton>
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
    EditorMenuBubble,
} from 'tiptap';
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import { SIZE, THEME } from '@Core/defaults/theme';
import IconButton from '@Core/components/Buttons/IconButton';
import IconLink from '@Core/components/Icons/Editor/IconLink';
import IconClose from '@Core/components/Icons/Window/IconClose';

export default {
    name: 'RichTextEditorMenuBubble',
    components: {
        EditorMenuBubble,
        IconLink,
        IconClose,
        IconButton,
    },
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            linkUrl: null,
            linkMenuIsActive: false,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onShowLinkMenu(getMarkAttrs) {
            this.linkUrl = getMarkAttrs('link').href;
            this.linkMenuIsActive = true;
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            });
        },
        onHideLinkMenu() {
            this.linkUrl = null;
            this.linkMenuIsActive = false;
        },
        setLinkUrl(commands) {
            commands.link({ href: this.linkUrl });
            this.onHideLinkMenu();
        },
    },
};
</script>

<style lang="scss" scoped>
    .menububble {
        position: absolute;
        z-index: $Z_INDEX_MODAL;
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

            & > span {
                margin-left: 4px;
            }
        }

        &__input {
            border: none;
            background-color: transparent;
            color: $WHITE;
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
