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
                :errors="errors"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UnitForm from '@Core/components/Forms/UnitForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
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
    computed: {
        ...mapState('validations', {
            errors: state => state.errors.unitGeneralTab,
        }),
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
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.updateUnit({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdatetError,
            });
        },
        async onUpdateSuccess() {
            await this.getDictionary({
                dictionaryName: 'units',
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Unit updated',
            });

            this.isSubmitting = false;
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
