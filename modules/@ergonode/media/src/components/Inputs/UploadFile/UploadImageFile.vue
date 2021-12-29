/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :size="size"
        :border="border"
        :height="height"
        :disabled="disabled">
        <template #activator>
            <InputController>
                <InputImageController>
                    <template v-if="isValue">
                        <div
                            v-if="!multiple"
                            class="fixed-container">
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
                        <ActionFab
                            v-if="!disabled"
                            :floating="{
                                top: '4px',
                                right: '4px',
                                backgroundColor: whiteColor,
                                borderRadius: '50%',
                            }"
                            :size="smallSize"
                            :theme="secondaryTheme"
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
                        </ActionFab>
                    </template>
                    <Button
                        v-else-if="!disabled"
                        :title="title"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </InputImageController>
                <InputLabel
                    v-if="label"
                    :required="required"
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
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'UploadImageFile',
    components: {
        ModalMediaTabBar: () => import('@Media/components/Modal/ModalMediaTabBar'),
    },
    props: {
        /**
         * The value of the component
         */
        value: {
            type: [
                String,
                Array,
            ],
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
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: 'none',
        },
        /**
         * The height of the component
         */
        height: {
            type: String,
            default: 'unset',
        },
        /**
         * The label is a text caption or description for the component
         */
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
        /**
         * Determines if the given field is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the given uploader might have more than one value
         */
        multiple: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the image is able to change / remove
         */
        editable: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if the image is able to download
         */
        downloadable: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines if the component has border
         */
        border: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isModalVisible: false,
            currentIndex: 0,
        };
    },
    computed: {
        ...mapState('media', [
            'extension',
        ]),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        whiteColor() {
            return WHITE;
        },
        title() {
            if (this.multiple) {
                return this.$t('@Media.media.components.UploadImageFile.pluralTitle');
            }

            return this.$t('@Media.media.components.UploadImageFile.singularTitle');
        },
        tabs() {
            const tabs = [
                {
                    title: this.$t('@Media.media.components.UploadImageFile.mediaTabTitle'),
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
                    title: this.$t('@Media.media.components.UploadImageFile.uploadFilesTabTitle'),
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
            const options = [];

            if (!this.multiple) {
                if (this.editable) {
                    options.push(
                        {
                            text: this.$t('@Media.media.components.UploadImageFile.changeImageOptionTitle'),
                            action: this.onShowModal,
                        },
                        {
                            text: this.$t('@Media.media.components.UploadImageFile.removeImageOptionTitle'),
                            action: this.onRemoveImage,
                        },
                    );
                }

                if (this.downloadable) {
                    options.push(
                        {
                            text: this.$t('@Media.media.components.UploadImageFile.downloadImageOptionTitle'),
                            action: this.onDownloadImage,
                        },
                    );
                }

                return options;
            }

            if (this.editable) {
                options.push(
                    {
                        text: this.$t('@Media.media.components.UploadImageFile.addImageToGalleryOptionTitle'),
                        action: this.onShowModal,
                    },
                    {
                        text: this.$t('@Media.media.components.UploadImageFile.detachFromGalleryOptionTitle'),
                        action: this.onRemoveImage,
                    },
                );
            }

            if (this.downloadable) {
                options.push(
                    {
                        text: this.$t('@Media.media.components.UploadImageFile.downloadImageOptionTitle'),
                        action: this.onDownloadImage,
                    },
                );
            }

            return options;
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
            const url = `multimedia/${value}/download`;

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
                    link.setAttribute('download', `${value}.${this.extension}`);
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
    .fixed-container {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        width: 100%;
        height: 0;
        overflow: hidden;
    }
</style>
