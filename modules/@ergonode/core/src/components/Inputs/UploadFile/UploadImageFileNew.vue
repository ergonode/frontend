/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UploadFileNew
        :label="label"
        :required="required"
        :disabled="disabled"
        :fixed-height="fixedHeight">
        <template #activator>
            <Button
                v-if="!isValue"
                :title="title"
                :size="smallSize"
                :theme="secondaryTheme"
                @click.native="onShowModal">
                <template #prepend="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </Button>
            <ModalTabBar
                v-if="isModalVisible"
                :items="tabs"
                @close="onCloseModal" />
            <div
                v-if="isValue"
                class="image-container">
                <Picture
                    v-if="!multiple"
                    object-fit="none"
                    :image-id="value" />
                <PictureCarousel
                    v-else
                    :image-ids="value" />
                <div class="image-settings image-white-theme">
                    <ActionIconButton
                        :size="smallSize"
                        :theme="secondaryPlainTheme"
                        :options="settingsOptions"
                        @input="onSelectSetting">
                        <template #icon="{ color }">
                            <IconDots :fill-color="color" />
                        </template>
                        <template #option="{ option }">
                            <ListElementDescription>
                                <ListElementTitle
                                    :size="smallSize"
                                    :title="option.text" />
                            </ListElementDescription>
                        </template>
                    </ActionIconButton>
                </div>
            </div>
        </template>
    </UploadFileNew>
</template>

<script>
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import UploadFileNew from '@Core/components/Inputs/UploadFile/UploadFileNew';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'UploadImageFileNew',
    components: {
        UploadFileNew,
        Button,
        IconAdd,
        IconDots: () => import('@Core/components/Icons/Others/IconDots'),
        Picture: () => import('@Core/components/Multimedia/Picture'),
        PictureCarousel: () => import('@Core/components/Multimedia/PictureCarousel'),
        ModalTabBar: () => import('@Core/components/Modal/ModalTabBar'),
        ActionIconButton: () => import('@Core/components/Buttons/ActionIconButton'),
        ListElementDescription: () => import('@Core/components/List/ListElementDescription'),
        ListElementTitle: () => import('@Core/components/List/ListElementTitle'),
    },
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        label: {
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
        multiple: {
            type: Boolean,
            default: true,
        },
        fixedHeight: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isModalVisible: false,
            currentIndex: 0,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        title() {
            return `Add Image${this.multiple ? 's' : ''}`;
        },
        tabs() {
            return [
                {
                    title: 'Media',
                    content: {
                        component: () => import('@Media/components/Tabs/MediaGridTab'),
                        props: {
                            multiple: this.multiple,
                        },
                        listeners: {
                            input: (value) => {
                                this.$emit('input', value);
                            },
                        },
                    },
                },
                {
                    title: 'Upload files',
                    content: {
                        component: () => import('@Core/components/Inputs/UploadFile/UploadFileTab'),
                        listeners: {},
                    },
                },
            ];
        },
        isValue() {
            if (this.multiple) {
                return this.value.length > 0;
            }

            return Boolean(this.value);
        },
        settingsOptions() {
            if (!this.multiple) {
                return [
                    {
                        text: 'Change this image',
                        action: this.onShowModal,
                    },
                    {
                        text: 'Download this  image',
                        action: this.onDownloadImage,
                    },
                    {
                        text: 'Remove this image',
                        action: this.onRemoveImage,
                    },
                ];
            }

            return [
                {
                    text: 'Add image to gallery',
                    action: this.onShowModal,
                },
                {
                    text: 'Download this image',
                    action: this.onDownloadImage,
                },
                {
                    text: 'Detach this image from gallery',
                    action: this.onRemoveImage,
                },
            ];
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onDownloadImage() {
            // TODO: Add downloading endpoint
        },
        onRemoveImage() {
            if (this.multiple) {
                this.$emit('input', this.value.filter(id => id !== this.value[this.currentIndex]));
            } else {
                this.$emit('input', '');
            }
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onSelectSetting(option) {
            option.action();
        },
    },
};
</script>

<style lang="scss" scoped>
    .image-container {
        position: relative;
        height: 100%;
    }

    .image-settings {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: $WHITE;
        border-radius: 50%;
    }
</style>
