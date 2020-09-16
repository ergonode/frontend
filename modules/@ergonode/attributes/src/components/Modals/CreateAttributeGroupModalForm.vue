/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create attribute group"
        @close="onClose">
        <template #body>
            <AttributeGroupForm
                submit-title="CREATE"
                proceed-title="CREATE & EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :errors="errors"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import AttributeGroupForm from '@Attributes/components/Forms/AttributeGroupForm';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CreateAttributeGroupModalForm',
    components: {
        ModalForm,
        AttributeGroupForm,
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        ...mapState('validations', {
            errors: state => state.errors.attributeGroupForm,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('attributeGroup', [
            'createAttributeGroup',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeErrors();

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.createAttributeGroup({
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeErrors();
            this.createAttributeGroup({
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute group created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.$router.push({
                name: 'attribute-group-id-general',
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
