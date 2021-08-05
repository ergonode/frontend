/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :size="size"
        height="80px"
        :disabled="disabled">
        <template #activator>
            <InputController>
                <InputImageController>
                    <IconFile />
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
                </InputImageController>
                <InputLabel
                    v-if="label"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
            </InputController>
        </template>
    </InputSolidStyle>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'FilePreview',
    props: {
        /**
         * The value of the component
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
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the image is able to download
         */
        downloadable: {
            type: Boolean,
            default: true,
        },
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
        settingsOptions() {
            const options = [];

            if (this.downloadable) {
                options.push(
                    {
                        text: this.$t('@Media.media.components.FilePreview.downloadFileOptionTitle'),
                        action: this.onDownloadFile,
                    },
                );
            }

            return options;
        },
    },
    methods: {
        onDownloadFile() {
            const url = `multimedia/${this.value}/download`;

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
                    link.setAttribute('download', `${this.value}.${this.extension}`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
        },
        onSelectSetting(option) {
            option.action();
        },
    },
};
</script>
