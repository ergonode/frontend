/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="upload-image">
        <span
            v-if="title"
            class="upload-image__title">{{ title }}</span>
        <div
            v-if="!selectedFileID"
            class="upload-image__wrapper">
            <input
                class="upload-image__activator"
                type="file"
                :value="selectedFileID"
                @input="e => onUpload(e)">
            <img
                :src="require('~/assets/images/icons/upload.svg')"
                alt="placeholder">
            <span class="upload-image__description txt-fixed">Drag image here or browse</span>
        </div>
        <div
            v-else
            class="upload-image__container">
            <div class="btn-wrapper">
                <Button
                    fab
                    icon="sprite-system system-trash--deactive"
                    color="transparent"
                    @click.native="onRemove" />
            </div>
            <Picture :image-id="selectedFileID" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UploadImage',
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
    components: {
        Button: () => import('~/components/Buttons/Button'),
        Picture: () => import('~/components/Inputs/Image/Picture'),
    },
    data() {
        return {
            selectedFileID: this.value,
            localImage: null,
        };
    },
    methods: {
        ...mapActions('validations', [
            'onError',
        ]),
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

                this.$addAlert(this.$store, { type: 'success', message: 'File uploaded' });
            }).catch(e => this.onError(e.data));
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-image {
        position: relative;
        display: flex;
        flex-direction: column;

        &__wrapper {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 24px;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);

            &::before {
                position: absolute;
                width: calc(100% - 32px);
                height: calc(100% - 32px);
                border: 1px dashed $grey;
                content: "";
            }
        }

        &__container {
            position: relative;
            display: flex;
            flex: 1;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);

            .btn-wrapper {
                position: absolute;
                top: 16px;
                right: 16px;
                background-color: $white;
                border-radius: 999px;
            }
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

        &__description {
            margin-top: 16px;
            text-align: center;
        }

        &__title {
            margin-bottom: 8px;
        }

        &__description, &__title {
            @include setFont(medium, small, regular, $graphite);
        }
    }
</style>
