/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                        <FormParagraph :text="paragraphText" />
                        <UploadImageFile
                            label="Upload file"
                            required />
                    </FormSection>
                </template>
            </Form>
        </template>
        <template #footer>
            <div>
                <Button
                    title="IMPORT NOW"
                    :disabled="isRequestPending"
                    @click.native="onUpload" />
            </div>
        </template>
    </ModalForm>
</template>

<script>
import { mapActions } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import { MODAL_ACTION } from '@Core/defaults/modals';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';
import ModalForm from '@Core/components/Modal/ModalForm';
import Button from '@Core/components/Buttons/Button';
import FormParagraph from '@Core/components/Form/FormParagraph';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';
import UploadImageFile from '@Core/components/Inputs/UploadFile/UploadImageFile';

const uploadImportProfile = () => import('@Import/services/uploadImportProfile.service');

export default {
    name: 'UploadImportFileModalForm',
    components: {
        Form,
        FormSection,
        FormParagraph,
        ModalForm,
        UploadImageFile,
        Button,
    },
    mixins: [actionModalFormMixin({ action: MODAL_ACTION.UPLOAD, namespace: 'Import profile', request: uploadImportProfile })],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        paragraphText() {
            return 'It may take some time to upload, please be patient. Maybe this is a great time for coffee?';
        },
    },
    methods: {
        ...mapActions('import', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onUpload() {
            this.onActionRequest(() => {
                this.clearStorage();
            });
        },
    },
};
</script>
