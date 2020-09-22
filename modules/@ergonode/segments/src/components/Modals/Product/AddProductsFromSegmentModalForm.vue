/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products from segment"
        @close="onClose">
        <template #body>
            <AddProductsFromSegmentForm
                :segment-options="segmentOptions"
                :segments="segments"
                submit-title="ADD TO COLLECTION"
                proceed-title="CANCEL"
                :is-submitting="isAdding"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import AddProductsFromSegmentForm from '@Segments/components/Forms/Product/AddProductsFromSegmentForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm,
        ModalForm,
    },
    data() {
        return {
            segmentOptions: [],
            segments: [],
            isAdding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    async created() {
        this.segmentOptions = await this.getSegmentOptions();
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
        ]),
        ...mapActions('segment', [
            'getSegmentOptions',
        ]),
        ...mapActions('product', [
            'addBySegment',
        ]),
        onFormValueChange(value) {
            this.segments = value;
        },
        onClose() {
            this.$emit('close');
        },
        onSubmit() {
            if (this.isAdding) {
                return;
            }
            this.isAdding = true;

            this.removeScopeErrors();
            this.addBySegment({
                segments: this.segments,
                onSuccess: this.onAddSuccess,
                onError: this.onAddError,
            });
        },
        onAddSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been added to collection',
            });

            this.isAdding = false;

            this.$emit('added');
        },
        onAddError(errors) {
            this.onError(errors);

            this.isAdding = false;
        },
    },
};
</script>
