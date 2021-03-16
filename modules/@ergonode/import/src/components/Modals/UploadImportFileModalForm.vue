/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Upload import file"
        @close="onClose">
        <template #body>
            <Form>
                <template #body>
                    <FormSection>
                        <Paragraph :title="paragraphText" />
                        <UploadFile
                            :value="Boolean(csvFile)"
                            accept-files="csv/*"
                            label="Upload file"
                            :scope="scope"
                            :error-messages="scopeErrors.upload"
                            required
                            @remove="onRemoveFile"
                            @upload="onFileUpload">
                            <template #file>
                                <IconFile :fill-color="greenColor" />
                                <LinkButton :title="csvFile.name" />
                            </template>
                        </UploadFile>
                    </FormSection>
                </template>
                <template #submit>
                    <UploadImportButton
                        :scope="scope"
                        :change-values="changeValues"
                        :errors="errors"
                        :csv-file="csvFile"
                        @uploaded="onClose" />
                </template>
            </Form>
        </template>
    </ModalForm>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import UploadImportButton from '@Import/components/Buttons/UploadImportButton';
import UploadFile from '@Media/components/Inputs/UploadFile/UploadFile';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import IconFile from '@UI/components/Icons/Others/IconFile';
import LinkButton from '@UI/components/LinkButton/LinkButton';
import ModalForm from '@UI/components/Modal/ModalForm';
import Paragraph from '@UI/components/Paragraph/Paragraph';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UploadImportFileModalForm',
    components: {
        UploadImportButton,
        UploadFile,
        LinkButton,
        IconFile,
        Form,
        FormSection,
        Paragraph,
        ModalForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            csvFile: null,
        };
    },
    computed: {
        greenColor() {
            return GREEN;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        paragraphText() {
            return 'It may take some time to upload, please be patient. Maybe this is a great time for coffee?';
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onRemoveFile() {
            this.csvFile = null;

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'upload',
                value: null,
            });
        },
        onFileUpload(file) {
            this.csvFile = file;

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'upload',
                value: file,
            });
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
    },
};
</script>
