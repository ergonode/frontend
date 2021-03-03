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
                        <div
                            class="upload-image-file__image"
                            v-if="!multiple">
                            <LazyImage
                                :href="`multimedia/${value}/download/default`"
                                :value="value"
                                :object-fit="objectFit" />
                        </div>
                        <ImageCarousel
                            v-else
                            :image-ids="value"
                            href="multimedia/[[ID]]/download/default"
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
                    v-else-if="!disabled">
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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Media/config/privileges';
import {
    MEDIA_TYPE,
} from '@Media/defaults';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';

export default {
    name: 'UploadImageFile',
    components: {
        InputController,
        InputSolidStyle,
        InputLabel,
        Button,
        IconAdd,
        IconDots: () => import('@UI/components/Icons/Others/IconDots'),
        LazyImage: () => import('@UI/components/LazyImage/LazyImage'),
        ImageCarousel: () => import('@UI/components/ImageCarousel/ImageCarousel'),
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
        ActionIconButton: () => import('@UI/components/ActionIconButton/ActionIconButton'),
        ListElementDescription: () => import('@UI/components/List/ListElementDescription'),
        ListElementTitle: () => import('@UI/components/List/ListElementTitle'),
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
        objectFit: {
            type: String,
            default: 'none',
        },
        height: {
            type: String,
            default: 'unset',
        },
        label: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is required
         */
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
            const tabs = [
                {
                    title: 'Media',
                    content: {
                        component: () => import('@Media/components/Grids/AddMediaGrid'),
                        props: {
                            multiple: this.multiple,
                            value: this.value,
                            type: MEDIA_TYPE.IMAGE,
                        },
                        listeners: {
                            input: (value) => {
                                this.$emit('input', value);
                            },
                        },
                    },
                },
            ];

            if (this.isAllowedToCreate) {
                tabs.push({
                    title: 'Upload files',
                    content: {
                        component: () => import('@Media/components/Tabs/UploadFileTab'),
                        listeners: {},
                    },
                });
            }

            return tabs;
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
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.create,
            ]);
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
            const url = `multimedia/${value}/download/default`;

            this.$axios.$get(url, {
                responseType: 'arraybuffer',
                withLanguage: false,
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
                const value = this.value.filter(id => id !== this.value[this.currentIndex]);

                if (this.currentIndex > 0) {
                    this.currentIndex -= 1;
                }
                this.$emit('input', value);
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

        &__image {
            position: relative;
            display: flex;
            flex: 1;
            height: 100%;
        }
    }
</style>
