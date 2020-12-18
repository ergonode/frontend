/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Restore parent value"
        @close="onClose">
        <template #body>
            <RestoreForm
                :submit-title="$t('product.buttons.restore')"
                :proceed-title="$t('product.buttons.proceed')"
                :errors="scopeErrors"
                :elements-to-restore="elementsToRestore"
                :elements="elements"
                :language="language"
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
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import RestoreForm from '@Products/components/Forms/RestoreForm';
import ModalForm from '@UI/components/Modal/ModalForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RestoreProductAttributesModalForm',
    components: {
        ModalForm,
        RestoreForm,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    props: {
        language: {
            type: Object,
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
    methods: {
        ...mapActions('product', [
            'removeProductValues',
        ]),
        onUpdateElementsToRestore(elements) {
            this.elementsToRestore = elements;
        },
        onClose() {
            this.removeScopeErrors(this.scope);

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
                            'Please mark attributes to restore',
                        ],
                    },
                });
                return;
            }

            this.removeScopeErrors(this.scope);
            this.removeProductValues({
                languageCode: this.language.code,
                attributes: attributes.map(attribute => ({
                    id: attribute.properties.attribute_id,
                })),
                onSuccess: () => this.onSubmitSuccess(attributes),
                onError: this.onSubmitError,
            });
        },
        onSubmitSuccess(attributes) {
            const attributesDescription = attributes
                .map(attribute => attribute.label || `#${attribute.properties.attribute_code}`)
                .join(', ');

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: `Attributes ${attributesDescription} have been restored`,
            });

            this.isSubmitting = false;

            this.$emit('restored');
        },
        onSubmitError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
