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
                proceed-title="CREATE AND EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
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
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateUnitModalForm',
    components: {
        ModalForm,
        UnitForm,
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
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            await this.createUnit({
                onSuccess: this.onCreateUnitSuccess,
                onError: this.onCreateUnitError,
            });
        },
        async onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeErrors();
            await this.createUnit({
                onSuccess: this.onCreateAndEditUnitSuccess,
                onError: this.onCreateUnitError,
            });
        },
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        async onCreateUnitSuccess() {
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
        async onCreateAndEditUnitSuccess(id) {
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
        onCreateUnitError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
