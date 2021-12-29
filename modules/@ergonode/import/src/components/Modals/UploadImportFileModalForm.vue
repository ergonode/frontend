/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Import.import.components.UploadImportFileModalForm.title')"
        @close="onClose">
        <template #body>
            <Form>
                <template #body>
                    <FormSection>
                        <Paragraph :title="paragraphText" />
                        <UploadFile
                            :value="Boolean(csvFile)"
                            accept-files="csv/*"
                            :label="$t('@Import.import.components.UploadImportFileModalForm.uploadLabel')"
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
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import UploadImportButton from '@Import/components/Buttons/UploadImportButton';
import {
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UploadImportFileModalForm',
    components: {
        UploadImportButton,
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
        paragraphText() {
            return this.$t('@Import.import.components.UploadImportFileModalForm.paragraphText');
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
