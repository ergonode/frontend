/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ProductForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="SAVE CHANGES"
                        type="submit">
                        <template
                            v-if="isSubmittingForm"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </ProductForm>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import ProductForm from '@Products/components/Form/ProductForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ProductGeneralTab',
    components: {
        Button,
        ProductForm,
        CenterViewTemplate,
        IconSpinner,
    },
    data() {
        return {
            isSubmittingForm: false,
        };
    },
    methods: {
        ...mapActions('product', [
            'updateProduct',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        async onSubmit() {
            if (this.isSubmittingForm) {
                return;
            }
            this.isSubmittingForm = true;

            try {
                this.removeValidationErrors();
                await this.updateProduct();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmittingForm = false;
            }
        },
    },
};
</script>
