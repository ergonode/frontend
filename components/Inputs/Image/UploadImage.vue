/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['upload-image', {
            'upload-image--disabled': disabled,
            'upload-image--elevator': elevator,
            'upload-image--fixed-height': fixedHeight,
        }]">
        <span
            v-if="title"
            class="upload-image__title font--medium-12-16"
            v-text="title" />
        <div
            v-if="!selectedFileID"
            class="upload-image__wrapper">
            <input
                class="upload-image__activator"
                type="file"
                accept="image/*"
                :value="selectedFileID"
                @input="e => onUpload(e)">
            <img
                :src="require('~/assets/images/icons/upload.svg')"
                alt="placeholder">
            <span class="upload-image__description font--medium-12-16">
                Drag image here or browse
            </span>
        </div>
        <div
            v-else
            class="upload-image__container">
            <div class="upload-image__remove-btn">
                <FabButton
                    :theme="secondaryTheme"
                    @select="onRemove">
                    <template #icon="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </FabButton>
            </div>
            <Picture :image-id="selectedFileID" />
        </div>
        <span
            v-if="uploadError"
            class="upload-image__error-label font--medium-12-16"
            v-text="uploadError.join(', ')" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { THEMES } from '~/defaults/buttons';
import { GRAPHITE, GREEN } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'UploadImage',
    props: {
        title: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fixedHeight: {
            type: Boolean,
            default: true,
        },
        elevator: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Picture: () => import('~/components/Inputs/Image/Picture'),
        FabButton: () => import('~/components/Buttons/FabButton'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
    },
    data() {
        return {
            selectedFileID: this.value,
            localImage: null,
            deleteIconFillColor: GRAPHITE,
        };
    },
    computed: {
        ...mapState('validations', {
            uploadError: (state) => state.validationErrors.upload,
        }),
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationError',
        ]),
        onMouseEnter() {
            this.deleteIconFillColor = GREEN;
        },
        onMouseLeave() {
            this.deleteIconFillColor = GRAPHITE;
        },
        onRemove() {
            this.selectedFileID = '';
            this.localImage = null;
            this.$emit('remove');
        },
        onUpload(event) {
            const [file] = event.target.files;
            const { name } = file;

            const formData = new FormData();
            formData.append('upload', file, name);

            this.$axios.$post('multimedia/upload', formData).then(({ id }) => {
                this.selectedFileID = id;
                this.$emit('upload', id);

                this.$addAlert({ type: 'success', message: 'File uploaded' });
                this.removeValidationError('upload');
            }).catch((e) => this.onError(e.data));
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-image {
        $parent: &;

        position: relative;
        display: flex;
        flex-direction: column;

        &--elevator {
            #{$parent}__wrapper, #{$parent}__container {
                box-shadow: $ELEVATOR_2_DP;
            }
        }

        &--disabled::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: $WHITESMOKE;
            opacity: 0.5;
            content: "";
            cursor: not-allowed;
        }

        &__wrapper {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: $WHITE;

            &::before {
                position: absolute;
                width: calc(100% - 32px);
                height: calc(100% - 32px);
                border: $BORDER_DASHED_GREY;
                content: "";
            }
        }

        &__container {
            position: relative;
            display: flex;
            max-height: 100%;
            background-color: $WHITE;
        }

        &__activator {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            outline: none;
            opacity: 0;
        }

        &__remove-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $WHITE;
            border-radius: 50%;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__description {
            margin-top: 16px;
            text-align: center;
        }

        &__title {
            margin-bottom: 8px;
        }

        &__description, &__title {
            color: $GRAPHITE;
        }

        &__error-label {
            color: $RED;
            margin-top: 8px;
        }

        &--fixed-height {
            #{$parent}__wrapper {
                min-height: 150px;
            }

            #{$parent}__container {
                height: 150px;
            }
        }
    }
</style>
