/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create attribute"
        @close="onClose">
        <template #body>
            <AttributeForm
                submit-title="CREATE"
                proceed-title="CREATE & EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import AttributeForm from '@Attributes/components/Forms/AttributeForm';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CreateAttributeModalForm',
    components: {
        ModalForm,
        AttributeForm,
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        ...mapState('feedback', {
            errors: state => state.errors,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
        scopeErrors() {
            return this.errors[this.scope];
        },
    },
    methods: {
        ...mapActions('attribute', [
            'createAttribute',
            '__clearStorage',
        ]),
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeErrors(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createAttribute({
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
            this.createAttribute({
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.$router.push({
                name: 'attribute-id-general',
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
