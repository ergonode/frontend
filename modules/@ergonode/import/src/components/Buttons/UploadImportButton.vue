/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('@Import.import.components.UploadImportButton.title')"
                :disabled="!isAllowedToUpdate"
                @click.native="onSubmit">
                <template #prepend="{ color }">
                    <IconSpinner
                        v-if="isSubmitting"
                        :fill-color="color" />
                    <IconSync
                        v-else-if="hasValueToSave"
                        :fill-color="color" />
                </template>
            </Button>
        </template>
    </FeedbackProvider>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import PRIVILEGES from '@Import/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UploadImportButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        csvFile: {
            type: File,
            default: null,
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('import', [
            'uploadImportFile',
        ]),
        onSubmit() {
            if (this.isSubmitting || !this.csvFile) {
                return;
            }
            this.isSubmitting = true;

            this.uploadImportFile({
                scope: this.scope,
                file: this.csvFile,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Import.import.components.UploadImportButton.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('uploaded');
            this.onClose();
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
