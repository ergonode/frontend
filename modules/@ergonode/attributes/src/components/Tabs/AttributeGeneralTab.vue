/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <AttributeForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import AttributeForm from '@Attributes/components/Forms/AttributeForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeGeneralTab',
    components: {
        CenterViewTemplate,
        AttributeForm,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('attribute', [
            'updateAttribute',
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
            this.updateAttribute({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Attribute updated',
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
