/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :errors="errors"
        :change-values="changeValues"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection :title="modalTitle">
                <CheckBox
                    v-for="attribute in attributes"
                    :key="attribute.properties.attribute_code"
                    :value="elementsToRestore[attribute.properties.attribute_code]"
                    :label="attribute.label"
                    :disabled="!isAllowedToRestore(attribute.properties.scope)"
                    @input="(value) => setElementToRestore({
                        key: attribute.properties.attribute_code,
                        value,
                    })" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    SCOPE,
    SYSTEM_TYPES,
} from '@Attributes/defaults';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'RestoreForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        elements: {
            type: Array,
            default: () => [],
        },
        elementsToRestore: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('core', [
            'inheritedLanguagesTree',
            'languages',
        ]),
        language() {
            return this.inheritedLanguagesTree.find(({
                code,
            }) => code === this.languageCode);
        },
        parentLanguage() {
            return this.languages.find(({
                id,
            }) => id === this.language.parent);
        },
        attributes() {
            return this.elements.filter(element => element.type !== SYSTEM_TYPES.SECTION);
        },
        modalTitle() {
            return this.$t('@Products.product.components.RestoreForm.modalTitle', {
                from: this.language.name,
                to: this.parentLanguage.name,
            });
        },
    },
    methods: {
        setElementToRestore({
            key,
            value,
        }) {
            this.$emit('update', {
                ...this.elementsToRestore,
                [key]: value,
            });
        },
        isAllowedToRestore(scope) {
            return scope !== SCOPE.GLOBAL;
        },
    },
};
</script>
