/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('attributeGroup.form.createTitle')"
        @close="onClose">
        <template #body>
            <AttributeGroupForm
                :submit-title="$t('core.buttons.create')"
                :proceed-title="$t('core.buttons.proceed')"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import AttributeGroupForm from '@Attributes/components/Forms/AttributeGroupForm';
import {
    ROUTE_NAMES,
} from '@Attributes/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import ModalForm from '@UI/components/Modal/ModalForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateAttributeGroupModalForm',
    components: {
        ModalForm,
        AttributeGroupForm,
    },
    mixins: [
        scopeErrorsMixin,
    ],
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
        ...mapActions('attributeGroup', [
            'createAttributeGroup',
            '__clearStorage',
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
            this.createAttributeGroup({
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
            this.createAttributeGroup({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('attributeGroup.messages.createSuccess'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.$router.push({
                name: ROUTE_NAMES.ATTRIBUTE_GROUPS_EDIT_GENERAL,
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
