/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :size="size"
        :height="height"
        :disabled="disabled">
        <template #activator>
            <InputController>
                <div
                    v-if="isValue"
                    class="upload-image-file">
                    <div class="fixed-container">
                        <Picture
                            v-if="!multiple"
                            :value="value"
                            object-fit="none" />
                        <PictureCarousel
                            v-else
                            :image-ids="value"
                            :current-index="currentIndex"
                            @current="onCurrentIndexChange" />
                        <div
                            v-if="!disabled"
                            class="upload-image-file__image-settings">
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
                </div>
                <div
                    class="centering-container"
                    v-else>
                    <Button
                        :title="title"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </div>
                <InputLabel
                    v-if="label"
                    :style="{ top: 0 }"
                    :required="required"
                    :size="size"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
            </InputController>
        </template>
        <ModalMediaTabBar
            v-if="isModalVisible"
            :tabs="tabs"
            @close="onCloseModal" />
    </InputSolidStyle>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import InputController from '@Core/components/Inputs/InputController';
import InputLabel from '@Core/components/Inputs/InputLabel';
import InputSolidStyle from '@Core/components/Inputs/InputSolidStyle';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'UploadImageFile',
    components: {
        InputController,
        InputSolidStyle,
        InputLabel,
        Button,
        IconAdd,
        IconDots: () => import('@Core/components/Icons/Others/IconDots'),
        Picture: () => import('@Core/components/Multimedia/Picture'),
        PictureCarousel: () => import('@Core/components/Multimedia/PictureCarousel'),
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
        ActionIconButton: () => import('@Core/components/ActionIconButton/ActionIconButton'),
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
                        component: () => import('@Media/components/Grid/MediaGrid'),
                        props: {
                            multiple: this.multiple,
                            value: this.value,
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
                        component: () => import('@Media/components/Tabs/UploadFileTab'),
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
                        text: 'Download this image',
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
        onCurrentIndexChange(index) {
            this.currentIndex = index;
        },
        onShowModal() {
            this.isModalVisible = true;
        },
        onDownloadImage() {
            const value = this.multiple
                ? this.value[this.currentIndex]
                : this.value;
            const url = `${process.env.baseURL}multimedia/${value}/download/default`;

            this.$axios.$get(url, {
                responseType: 'arraybuffer',
            })
                .then((response) => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([
                        response,
                    ]));
                    const link = document.createElement('a');

                    link.href = downloadUrl;
                    link.setAttribute('download', `${value}.png`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
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
    .centering-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .fixed-container {
        position: relative;
        flex: 1 1 auto;
        height: 0;
        margin: 4px 0;
        overflow: hidden;
    }

    .upload-image-file {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        &__image-settings {
            position: absolute;
            top: 8px;
            right: 8px;
            background-color: $WHITE;
            border-radius: 50%;
        }
    }
</style>
