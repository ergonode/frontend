/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputUUIDProvider>
        <template #default="{ uuid }">
            <div class="upload-file-tab">
                <div
                    :class="[
                        'upload-file-tab__activator',
                        { 'upload-file-tab__activator--hovered': isDraggedFileOver }
                    ]">
                    <input
                        :id="uuid"
                        type="file"
                        ref="input"
                        multiple
                        data-cy="upload-file"
                        @dragenter="onDragEnter"
                        @dragleave="onDragLeave"
                        @change="onUpload">
                    <label
                        class="upload-file-tab__label"
                        :for="uuid">
                        <IconUploadCloudFile
                            :fill-color="uploadCloudFileIconColor"
                            view-box="0 0 48 32"
                            width="48"
                            height="32" />
                        <span
                            class="information-label"
                            v-text="$t('@Media.media.components.UploadFileTab.informationLabel')" />
                        <template v-if="!isDraggedFileOver">
                            <span
                                class="information-label-logic-operator"
                                v-text="$t('@Media.media.components.UploadFileTab.logicOperator')" />
                            <Button
                                :size="smallSize"
                                :title="$t('@Media.media.components.UploadFileTab.browseTitle')"
                                @click.native="onBrowseFile" />
                        </template>
                    </label>
                </div>
                <div
                    class="upload-file-tab__uploading-panel"
                    v-show="files.length">
                    <ListScrollableContainer>
                        <UploadFileList>
                            <UploadFileListLoadingElement :files="files" />
                            <UploadFileListElement
                                v-for="(file, index) in files"
                                :key="index"
                                :file="file" />
                        </UploadFileList>
                    </ListScrollableContainer>
                </div>
            </div>
        </template>
    </InputUUIDProvider>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getMappedScopedErrors,
} from '@Core/models/mappers/errorsMapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
import {
    formatBytes,
} from '@Core/models/stringWrapper';
import {
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadFileTab',
    data() {
        return {
            files: [],
            isDraggedFileOver: false,
        };
    },
    computed: {
        uploadCloudFileIconColor() {
            return this.isDraggedFileOver ? WHITE : GREEN;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onDragEnter() {
            this.isDraggedFileOver = true;
        },
        onDragLeave() {
            this.isDraggedFileOver = false;
        },
        onBrowseFile() {
            this.$refs.input.click();
        },
        onUpload(event) {
            const {
                files,
            } = event.target;
            const {
                length,
            } = this.files;

            this.isDraggedFileOver = false;

            Object.keys(files).forEach((key, index) => {
                const fixedIndex = length + index;
                const file = files[key];
                const {
                    name, size,
                } = file;
                const cancelToken = this.$axios.CancelToken.source();
                const config = {
                    cancelToken: cancelToken.token,
                    withLanguage: false,
                    onUploadProgress: ({
                        loaded, total,
                    }) => {
                        this.files[fixedIndex].progressValue = Math.floor((loaded * 100) / total);
                        this.files[fixedIndex].progressInfo = formatBytes(loaded, 2);
                    },
                };

                this.files.push({
                    name,
                    size: formatBytes(size, 2),
                    progressValue: 0,
                    progressInfo: 0,
                    cancelToken,
                    error: '',
                });

                const formData = new FormData();
                formData.append('upload', file, name);

                this.$axios.$post('multimedia/upload', formData, config).then(({
                    id,
                }) => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: this.$t('@Media.media.components.UploadFileTab.successMessage'),
                    });
                    this.$emit('uploaded-file', id);
                }).catch((e) => {
                    if (this.$axios.isCancel(e)) {
                        this.$addAlert({
                            type: ALERT_TYPE.INFO,
                            message: e.message,
                        });
                        this.files.splice(fixedIndex, 1);

                        return;
                    }
                    const isError = e.data && e.data.errors && isObject(e.data.errors);

                    this.files[fixedIndex].error = isError
                        ? getMappedScopedErrors({
                            errors: e.data.errors,
                            fieldKeys: {},
                            scope: 'uploadFileTab',
                        }).uploadFileTab.upload
                        : this.$t('@Media.media.components.UploadFileTab.errorMessage');
                });
            });

            this.$refs.input.value = '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file-tab {
        $upload-file-tab: &;

        display: flex;
        flex: 1;
        padding: 24px;

        &__activator {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_HOLE;

            input {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                padding: 0;
                margin: 0;
                outline: none;
                opacity: 0;
            }

            &--hovered {
                background-color: $GREEN;

                #{$upload-file-tab}__label .information-label {
                    color: $WHITE;
                }
            }
        }

        &__label {
            display: flex;
            flex-direction: column;
            align-items: center;

            .information-label {
                margin-top: 16px;
                font: $FONT_MEDIUM_16_24;
            }

            .information-label-logic-operator {
                margin-bottom: 12px;
                font: $FONT_MEDIUM_12_16;
            }

            .information-label, .information-label-logic-operator {
                color: $GRAPHITE_DARK;
            }
        }

        &__uploading-panel {
            display: flex;
            flex: 1;
            margin-left: 24px;
            padding: 16px;
            overflow: auto;
        }
    }
</style>
