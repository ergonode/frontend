/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create product"
        @close="onClose">
        <template #body>
            <ProductForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="CREATE"
                        type="submit">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
                <template #proceedForm>
                    <Button
                        title="CREATE & EDIT"
                        :theme="secondaryTheme"
                        @click.native="onCreateAndEdit">
                        <template
                            v-if="isCreatingAndEdit"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </ProductForm>
        </template>
    </ModalForm>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    THEME,
} from '@Core/defaults/theme';
import ProductForm from '@Products/components/Form/ProductForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateProductModalForm',
    components: {
        Button,
        IconSpinner,
        ModalForm,
        ProductForm,
    },
    fetch() {
        this.getSelectAttributes();
    },
    data() {
        return {
            isSubmitting: false,
            isCreatingAndEdit: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('product', [
            'getSelectAttributes',
            'createProduct',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting || this.isCreatingAndEdit) {
                return;
            }
            this.isSubmitting = true;

            try {
                this.removeErrors();
                await this.createProduct();
                this.$emit('created');
                this.onClose();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmitting = false;
            }
        },
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        async onCreateAndEdit() {
            this.isCreatingAndEdit = true;

            try {
                this.removeErrors();
                const id = await this.createProduct();
                await this.$router.push({
                    name: 'product-id-general',
                    params: {
                        id,
                    },
                });
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isCreatingAndEdit = false;
            }
        },
    },
};
</script>
