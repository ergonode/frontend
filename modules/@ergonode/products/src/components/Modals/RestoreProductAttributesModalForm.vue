/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Products.product.components.RestoreProductAttributesModalForm.title')"
        @close="onClose">
        <template #body>
            <RestoreForm
                :submit-title="$t('@Products._.restore')"
                :proceed-title="$t('@Products._.proceed')"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                :elements-to-restore="elementsToRestore"
                :elements="elements"
                :language-code="languageCode"
                :is-submitting="isSubmitting"
                @update="onUpdateElementsToRestore"
                @submit="onSubmit"
                @proceed="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import RestoreForm from '@Products/components/Forms/RestoreForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'RestoreProductAttributesModalForm',
    components: {
        RestoreForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    props: {
        productTemplateScope: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
        elements: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isSubmitting: false,
            elementsToRestore: {},
        };
    },
    computed: {
        ...mapState('product', [
            'id',
        ]),
    },
    methods: {
        ...mapActions('product', [
            'removeProductValues',
            'getProductCompleteness',
            'getInheritedProduct',
        ]),
        ...mapActions('feedback', [
            'removeScopeChangeValue',
        ]),
        onUpdateElementsToRestore(elements) {
            this.elementsToRestore = elements;
        },
        onClose() {
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            const attributes = this.elements.filter(
                element => this.elementsToRestore[element.properties.attribute_code],
            );

            if (attributes.length === 0) {
                this.onError({
                    scope: this.scope,
                    errors: {
                        __form: [
                            this.$t('@Products.product.components.RestoreProductAttributesModalForm.formValidation'),
                        ],
                    },
                });
                return;
            }

            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.removeProductValues({
                languageCode: this.languageCode,
                attributes: attributes.map(attribute => ({
                    id: attribute.properties.attribute_id,
                })),
                onSuccess: () => this.onSubmitSuccess(attributes),
                onError: this.onSubmitError,
            });
        },
        async onSubmitSuccess(attributes) {
            const attributesDescription = attributes
                .map(attribute => attribute.label || `#${attribute.properties.attribute_code}`)
                .join(', ');

            attributes.forEach((attribute) => {
                this.removeScopeChangeValue({
                    scope: this.productTemplateScope,
                    fieldKey: `${attribute.properties.attribute_code}/${this.languageCode}`,
                });
            });

            await Promise.all([
                this.getProductCompleteness({
                    languageCode: this.languageCode,
                }),
                this.getInheritedProduct({
                    id: this.id,
                    languageCode: this.languageCode,
                }),
            ]);

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.RestoreProductAttributesModalForm.successAlert', {
                    info: attributesDescription,
                }),
            });

            this.isSubmitting = false;

            this.onClose();
        },
        onSubmitError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
