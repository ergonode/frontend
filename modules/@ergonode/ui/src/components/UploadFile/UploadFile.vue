/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <InputSolidStyle
                :size="size"
                :height="height"
                :disabled="disabled"
                :details-label="informationLabel">
                <template #activator>
                    <InputController>
                        <input
                            v-if="!value"
                            class="upload-file"
                            :id="uuid"
                            type="file"
                            ref="input"
                            :accept="acceptFiles"
                            :disabled="disabled"
                            @input="onUpload">
                        <InputImageController>
                            <InputUploadPlaceholder v-if="!value" />
                            <InputUploadSpinner v-else-if="requestPending" />
                            <div
                                class="upload-file__content"
                                v-else>
                                <slot name="file" />
                            </div>
                            <Fab
                                v-if="!disabled && value"
                                :floating="{
                                    top: '4px',
                                    right: '4px',
                                    backgroundColor: whiteColor,
                                }"
                                :theme="destructiveTheme"
                                @click.native="onRemove">
                                <template #icon="{ color }">
                                    <IconDelete :fill-color="color" />
                                </template>
                            </Fab>
                        </InputImageController>
                        <InputLabel
                            v-if="label"
                            :for="uuid"
                            :required="required"
                            :floating="true"
                            :disabled="disabled"
                            :label="label"
                            :error="isError" />
                    </InputController>
                </template>
            </InputSolidStyle>
        </template>
    </InputUUIDProvider>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadFile',
    props: {
        label: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        acceptFiles: {
            type: String,
            required: true,
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
        value: {
            type: Boolean,
            default: false,
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
        requestPending: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '136px',
        },
    },
    computed: {
        destructiveTheme() {
            return THEME.DESTRUCTIVE;
        },
        whiteColor() {
            return WHITE;
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        isError() {
            return Boolean(this.errorMessages);
        },
    },
    methods: {
        onRemove() {
            this.$emit('remove');
        },
        onUpload(event) {
            const [
                file,
            ] = event.target.files;

            this.$emit('upload', file);
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file {
        position: absolute;
        z-index: $Z_INDEX_LVL_1;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        outline: none;
        opacity: 0;
        cursor: pointer;

        &__content {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 0;
            overflow: hidden;
        }
    }
</style>
