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
                        <Fab
                            v-else-if="!disabled"
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
                        <InputImageController>
                            <InputUploadPlaceholder v-if="!value" />
                            <InputUploadSpinner v-else-if="requestPending" />
                            <div
                                class="upload-file__content"
                                v-else>
                                <slot name="file" />
                            </div>
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
    GRAPHITE,
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Fab from '@UI/components/Fab/Fab';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import InputController from '@UI/components/Input/InputController';
import InputImageController from '@UI/components/Input/InputImageController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import InputUploadPlaceholder from '@UI/components/Input/InputUploadPlaceholder';
import InputUploadSpinner from '@UI/components/Input/InputUploadSpinner';
import InputUUIDProvider from '@UI/components/Input/InputUUIDProvider';

export default {
    name: 'UploadFile',
    components: {
        InputUploadPlaceholder,
        InputUploadSpinner,
        InputController,
        InputImageController,
        InputSolidStyle,
        Fab,
        IconDelete,
        InputUUIDProvider,
        InputLabel,
    },
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
        border: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            deleteIconFillColor: GRAPHITE,
        };
    },
    computed: {
        classes() {
            return [
                'upload-file',
                {
                    'upload-file--required': this.required,
                    'upload-file--floating-label': Boolean(this.label),
                    'upload-file--disabled': this.disabled,
                    'upload-file--error': this.errorMessages !== '',
                },
            ];
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
        onMouseEnter() {
            this.deleteIconFillColor = GREEN;
        },
        onMouseLeave() {
            this.deleteIconFillColor = GRAPHITE;
        },
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
