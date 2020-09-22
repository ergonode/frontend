/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products by SKU"
        @close="onClose">
        <template #body>
            <AddProductsBySKUForm
                :product-skus="productSkus"
                submit-title="ADD TO COLLECTION"
                proceed-title="CANCEL"
                :is-submitting="isAdding"
                :errors="scopeErrors"
                @submit="onSubmit"
                @proceed="onClose"
                @input="onFormValueChange" />
        </template>
    </ModalForm>
</template>

<script>
import AddProductsBySKUForm from '@Collections/components/Forms/AddProductsBySKUForm';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm,
        ModalForm,
    },
    data() {
        return {
            productSkus: '',
            isAdding: false,
        };
    },
    computed: {
        ...mapState('validations', [
            'errors',
        ]),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
        scopeErrors() {
            return this.errors[this.scope];
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeScopeErrors',
        ]),
        ...mapActions('collection', [
            'addBySku',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.$emit('close');
        },
        onSubmit() {
            if (this.isAdding) {
                return;
            }
            this.isAdding = true;

            this.removeScopeErrors(this.scope);
            this.addBySku({
                scope: this.scope,
                skus: this.productSkus,
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
