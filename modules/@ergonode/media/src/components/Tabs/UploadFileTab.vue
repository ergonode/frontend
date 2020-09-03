/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="upload-file-tab">
        <div
            :class="[
                'upload-file-tab__activator',
                { 'upload-file-tab__activator--hovered': isDraggedFileOver }
            ]">
            <input
                :id="associatedLabel"
                type="file"
                ref="input"
                multiple
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @input="onUpload">
            <label
                class="upload-file-tab__label"
                :for="associatedLabel">
                <IconUploadCloudFile
                    :fill-color="greenColor"
                    view-box="0 0 48 32"
                    width="48"
                    height="32" />
                <span class="information-label">Drag and drop files</span>
                <span class="information-label-logic-operator">or</span>
                <Button
                    :size="smallSize"
                    title="BROWSE FILE"
                    @click.native="onBrowseFile" />
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

<script>
import {
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import IconUploadCloudFile from '@Core/components/Icons/Actions/IconUploadCloudFile';
import ListScrollableContainer from '@Core/components/List/ListScrollableContainer';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
} from '@Core/defaults/theme';
import associatedLabelMixin from '@Core/mixins/inputs/associatedLabelMixin';
import {
    getMappedErrors,
} from '@Core/models/mappers/errorsMapper';
import {
    formatBytes,
} from '@Core/models/stringWrapper';
import UploadFileList from '@Media/components/List/UploadFileList';
import UploadFileListElement from '@Media/components/List/UploadFileListElement';
import UploadFileListLoadingElement from '@Media/components/List/UploadFileListLoadingElement';

export default {
    name: 'UploadFileTab',
    components: {
        IconUploadCloudFile,
        Button,
        UploadFileList,
        UploadFileListElement,
        UploadFileListLoadingElement,
        ListScrollableContainer,
    },
    mixins: [
        associatedLabelMixin,
    ],
    data() {
        return {
            files: [],
            isDraggedFileOver: false,
        };
    },
    computed: {
        greenColor() {
            return GREEN;
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
                        message: 'File uploaded',
                    });
                    this.isRequestPending = false;
                    this.$emit('uploadedFile', id);
                }).catch((e) => {
                    if (this.$axios.isCancel(e)) {
                        this.$addAlert({
                            type: ALERT_TYPE.INFO,
                            message: e.message,
                        });
                        this.files.splice(fixedIndex, 1);
                    } else {
                        const errorMessages = e.data && e.data.errors
                            ? getMappedErrors({
                                errors: e.data.errors,
                                fieldKey: 'uploader',
                            }).uploader
                            : 'Internal server error';

                        this.isRequestPending = false;
                        this.files[fixedIndex].error = errorMessages;
                    }
                });
            });

            this.$refs.input.value = '';
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-file-tab {
        display: flex;
        flex: 1;
        padding: 24px;

        &__activator {
            $activator: &;

            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: $BORDER_DASHED_GREY;

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
                background-color: $GREEN_LIGHT;
                border-color: $GREEN;
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
