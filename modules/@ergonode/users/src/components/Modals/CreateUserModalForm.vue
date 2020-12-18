/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('user.form.createTitle')"
        @close="onClose">
        <template #body>
            <UserForm
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import ModalForm from '@UI/components/Modal/ModalForm';
import UserForm from '@Users/components/Forms/UserForm';
import {
    ROUTE_NAME,
} from '@Users/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateUserModalForm',
    components: {
        ModalForm,
        UserForm,
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
        ...mapActions('user', [
            'createUser',
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
            this.createUser({
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
            this.createUser({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('user.messages.createSuccess'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.$router.push({
                name: ROUTE_NAME.USER_EDIT_GENERAL,
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
