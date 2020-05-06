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
                @input="onFormValueChange" />
        </template>
        <template #footer>
            <Button
                title="ADD TO COLLECTION"
                :disabled="isRequestPending"
                @click.native="onAdd" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { isEmpty } from '@Core/models/objectWrapper';
import { THEME } from '@Core/defaults/theme';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'AddProductsBySKUModalForm',
    components: {
        AddProductsBySKUForm: () => import('@Collections/components/Forms/AddProductsBySKUForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    data() {
        return {
            productSkus: '',
            isRequestPending: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('collections', {
            id: state => state.id,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onFormValueChange(value) {
            this.productSkus = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeValidationErrors();
            const preValidationErrors = {};
            const data = {
                skus: this.productSkus,
            };

            if (!isEmpty(preValidationErrors)) {
                this.onError({ errors: preValidationErrors });
                return;
            }

            this.isRequestPending = true;
            this.$axios.$post(`${this.language}/collections/${this.id}/elements/multiple`, data).then(() => {
                this.isRequestPending = false;
                this.removeValidationErrors();
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Products has been added to collection' });

                this.$emit('added');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
