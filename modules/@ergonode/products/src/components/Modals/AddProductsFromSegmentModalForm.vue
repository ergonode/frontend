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
                @input="onFormValueChange" />
        </template>
        <template #footer>
            <Button
                title="ADD TO PRODUCT"
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromSegmentModalForm',
    components: {
        AddProductsFromSegmentForm: () => import('@Products/components/Form/AddProductsFromSegmentForm'),
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    data() {
        return {
            segmentOptions: [],
            segments: [],
            isRequestPending: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            language: state => state.user.language,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    created() {
        this.$axios.$get(`${this.language}/segments?limit=5000&offset=0`).then(({
            collection,
        }) => {
            this.segmentOptions = collection.map(({
                id, code, name,
            }) => ({
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
        onFormValueChange(value) {
            this.segments = value;
        },
        onClose() {
            this.$emit('close');
        },
        onAdd() {
            this.removeValidationErrors();
            const data = {
                segments: this.segments.map(segment => segment.id),
            };

            this.isRequestPending = true;

            this.$axios.$post(`${this.language}/products/${this.id}/children/add-from-segments`, data).then(() => {
                this.isRequestPending = false;
                this.removeValidationErrors();
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: 'Products has been added',
                });

                this.$emit('added');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
