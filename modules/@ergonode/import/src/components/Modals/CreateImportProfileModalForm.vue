/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Import.import.components.CreateImportProfileModalForm.title')"
        @close="onClose">
        <template #body>
            <ImportProfileForm
                :submit-title="$t('@Import._.create')"
                :proceed-title="$t('@Import._.proceed')"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import ImportProfileForm from '@Import/components/Forms/ImportProfileForm';
import {
    ROUTE_NAME,
} from '@Import/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateImportProfileModalForm',
    components: {
        ImportProfileForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    async fetch() {
        this.__clearStorage();

        await this.getInitialDictionaries({
            keys: [
                'sources',
            ],
        });
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    methods: {
        ...mapActions('import', [
            'createImportProfile',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createImportProfile({
                scope: this.scope,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.createImportProfile({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Import.import.components.CreateImportProfileModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.removeScopeErrors(this.scope);

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.IMPORT_EDIT_GENERAL,
                params: {
                    id,
                },
            });
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
