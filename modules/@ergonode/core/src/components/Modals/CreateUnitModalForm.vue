/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="New unit"
        @close="onClose">
        <template #body>
            <UnitForm
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
import UnitForm from '@Core/components/Forms/UnitForm';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateUnitModalForm',
    components: {
        ModalForm,
        UnitForm,
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
        ...mapActions('unit', [
            'createUnit',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getDictionary',
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
                dictionaryName: 'units',
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Unit created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        async onProceedSuccess(id) {
            await this.getDictionary({
                dictionaryName: 'units',
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Unit created',
            });

            this.isProceeding = false;

            await this.$router.push({
                name: 'unit-id-general',
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
