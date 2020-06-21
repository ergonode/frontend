/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Add products to collection"
        @close="onClose">
        <template #body>
            <AddProductsToCollectionForm
                :segment-options="segmentOptions"
                :segments="segments"
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
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { THEME } from '@Core/defaults/theme';
import { isEmpty } from '@Core/models/objectWrapper';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'AddProductsToCollectionModalForm',
    components: {
        AddProductsToCollectionForm: () => import('@Collections/components/Forms/AddProductsToCollectionForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    data() {
        return {
            segmentOptions: [],
            segments: [],
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
    created() {
        this.$axios.$get(`${this.language}/segments?limit=5000&offset=0`).then(({ collection }) => {
            this.segmentOptions = collection.map(({ id, code, name }) => ({
                id,
                key: code,
                value: name,
                hint: name ? `#${code}` : '',
            }));
        });
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onFormValueChange({ key, value }) {
            this[key] = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeValidationErrors();
            const preValidationErrors = {};
            const data = {
                segments: this.segments.map(segment => segment.id),
                skus: this.productSkus,
            };

            if (data.segments.length < 1 && data.skus === '') {
                preValidationErrors.skus = ['Both fields can not be empty'];
                preValidationErrors.segments = ['Both fields can not be empty'];
            }
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
