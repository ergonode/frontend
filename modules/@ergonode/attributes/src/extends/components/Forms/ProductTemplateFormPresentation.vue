/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection title="Presentation product">
        <TranslationLazySelect
            :data-cy="dataCyGenerator('default-label')"
            :value="defaultTextAttribute"
            label="Default label attribute"
            :fetch-options-request="getDefaultTextAttributeOptionsRequest"
            :disabled="disabled"
            @input="setDefaultTextAttributeValue" />
        <TranslationLazySelect
            :data-cy="dataCyGenerator('default-image')"
            :value="defaultImageAttribute"
            clearable
            label="Default image attribute"
            :fetch-options-request="getDefaultImageAttributeOptionsRequest"
            :disabled="disabled"
            @input="setDefaultImageAttributeValue" />
    </FormSection>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import FormSection from '@UI/components/Form/Section/FormSection';
import TranslationLazySelect from '@UI/components/Select/TranslationLazySelect';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormPresentation',
    components: {
        FormSection,
        TranslationLazySelect,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('productTemplate', [
            'defaultTextAttribute',
            'defaultImageAttribute',
        ]),
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        ...mapActions('attribute', [
            'getAttributesOptionsByType',
        ]),
        setDefaultTextAttributeValue(value) {
            this.__setState({
                key: 'defaultTextAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultTextAttribute',
                value,
            });
        },
        setDefaultImageAttributeValue(value) {
            this.__setState({
                key: 'defaultImageAttribute',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'defaultImageAttribute',
                value,
            });
        },
        getDefaultTextAttributeOptionsRequest() {
            return this.getAttributesOptionsByType({
                type: 'TEXT',
            });
        },
        getDefaultImageAttributeOptionsRequest() {
            return this.getAttributesOptionsByType({
                type: 'IMAGE',
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
