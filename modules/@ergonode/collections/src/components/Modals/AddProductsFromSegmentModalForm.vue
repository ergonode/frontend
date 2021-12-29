/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Collections.collection.components.AddProductsFromSegmentModalForm.title')"
        @close="onClose">
        <template #body>
            <AddProductsFromSegmentForm
                :segments="segments"
                :submit-title="$t('@Collections.collection.components.AddProductsFromSegmentModalForm.formSubtitle')"
                :proceed-title="$t('@Collections._.cancel')"
                :is-submitting="isAdding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import AddProductsFromSegmentForm from '@Segments/components/Forms/AddProductsFromSegmentForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            segments: [],
            isAdding: false,
        };
    },
    methods: {
        ...mapActions('collection', [
            'addBySegment',
        ]),
        onFormValueChange(value) {
            this.segments = value;
        },
        onClose() {
            this.removeScopeData(this.scope);
            this.$emit('close');
        },
        onSubmit() {
            if (this.isAdding) {
                return;
            }
            this.isAdding = true;

            this.removeScopeErrors(this.scope);
            this.addBySegment({
                scope: this.scope,
                segments: this.segments,
                onSuccess: this.onSubmitSuccess,
                onError: this.onAddError,
            });
        },
        onSubmitSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Collections.collection.components.AddProductsFromSegmentModalForm.successMessage'),
            });

            this.isAdding = false;

            this.$emit('submitted');

            this.onClose();
        },
        onAddError(errors) {
            this.onError(errors);

            this.isAdding = false;
        },
    },
};
</script>
