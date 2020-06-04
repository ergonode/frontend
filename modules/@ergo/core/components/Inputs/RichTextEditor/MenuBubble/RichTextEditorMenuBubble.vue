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
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onHideLinkMenu">
                        <template #icon>
                            <IconClose />
                        </template>
                    </IconButton>
                </form>
                <Button
                    v-else
                    :title="isActive.link() ? 'Update Link' : 'Add Link'"
                    :size="smallSize"
                    :theme="secondaryTheme"
                    @click.native="onShowLinkMenu(getMarkAttrs)">
                    <template #append="{ color }">
                        <IconLink :fill-color="color" />
                    </template>
                </Button>
            </div>
        </template>
    </EditorMenuBubble>
</template>

<script>
import {
    EditorMenuBubble,
} from 'tiptap';
import { SIZE, THEME } from '@Core/defaults/theme';
import Button from '@Core/components/Buttons/Button';
import IconButton from '@Core/components/Buttons/IconButton';
import IconLink from '@Core/components/Icons/Editor/IconLink';
import IconClose from '@Core/components/Icons/Window/IconClose';

export default {
    name: 'RichTextEditorMenuBubble',
    components: {
        EditorMenuBubble,
        IconLink,
        IconClose,
        Button,
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
        smallSize() {
            return SIZE.SMALL;
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
        background-color: $BLACK;
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
        }

        &__input {
            border: none;
            background-color: transparent;
            color: $WHITE;
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
