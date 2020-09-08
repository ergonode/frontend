/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CollectionForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CollectionForm from '@Collections/components/Forms/CollectionForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CollectionGeneralTab',
    components: {
        CenterViewTemplate,
        CollectionForm,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('collection', [
            'updateCollection',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        ...mapActions('grid', [
            'setDrafts',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.setDrafts();

            this.updateCollection({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Collection updated',
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
