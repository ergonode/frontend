/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Core.core.components.CreateUnitModalForm.title')"
        @close="onClose">
        <template #body>
            <UnitForm
                :submit-title="$t('@Core._.buttons.create')"
                :proceed-title="$t('@Core._.buttons.proceed')"
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
import UnitForm from '@Core/components/Forms/UnitForm';
import {
    ROUTE_NAME,
} from '@Core/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateUnitModalForm',
    components: {
        UnitForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    fetch() {
        this.__clearStorage();
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('unit', [
            'createUnit',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getDictionary',
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
            this.createUnit({
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

            this.removeScopeErrors(this.scope);
            this.createUnit({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        async onCreateSuccess() {
            await this.getDictionary({
                key: 'units',
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Core.core.components.CreateUnitModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        async onProceedSuccess(id) {
            await this.getDictionary({
                key: 'units',
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Core.core.components.CreateUnitModalForm.successMessage'),
            });

            this.isProceeding = false;

            this.onClose();
            await this.$router.push({
                name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
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
