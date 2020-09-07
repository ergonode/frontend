/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UnitForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UnitForm from '@Core/components/Forms/UnitForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UnitGeneralTab',
    components: {
        UnitForm,
        CenterViewTemplate,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('unit', [
            'updateUnit',
        ]),
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            await this.updateUnit({
                onSuccess: this.onCreateUnitSuccess,
                onError: this.onCreateUnitError,
            });
        },
        async onCreateUnitSuccess() {
            await this.getDictionary({
                dictionaryName: 'units',
            });

            this.isSubmitting = false;
        },
        onCreateUnitError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
