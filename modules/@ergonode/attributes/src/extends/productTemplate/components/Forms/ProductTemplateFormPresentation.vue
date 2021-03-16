/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormSection :title="$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.title')">
        <AttributesAutocomplete
            :data-cy="dataCyGenerator('default-label')"
            :value="defaultTextAttribute"
            :label="$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.defaultLabel')"
            :searchable="true"
            :clearable="true"
            :disabled="disabled"
            :params="autocompleteDefaultLabelParams"
            :error-messages="errors.defaultLabel"
            :additional-static-options="additionalStaticTextOptions"
            :no-data-placeholder="noTextAttributeDataPlaceholder"
            @input="setDefaultTextAttributeValue" />
        <AttributesAutocomplete
            :data-cy="dataCyGenerator('default-image')"
            :value="defaultImageAttribute"
            :label="$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.defaultImage')"
            :clearable="true"
            :disabled="disabled"
            :params="autocompleteDefaultImageParams"
            :error-messages="errors.defaultImage"
            :no-data-placeholder="noImageAttributeDataPlaceholder"
            @input="setDefaultImageAttributeValue" />
    </FormSection>
</template>

<script>
import AttributesAutocomplete from '@Attributes/components/Autocompletes/AttributesAutocomplete';
import {
    SKU_MODEL,
    TYPES,
} from '@Attributes/defaults/attributes';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import FormSection from '@UI/components/Form/Section/FormSection';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormPresentation',
    components: {
        AttributesAutocomplete,
        FormSection,
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
        additionalStaticTextOptions() {
            return [
                SKU_MODEL,
            ];
        },
        autocompleteDefaultImageParams() {
            return {
                system: false,
                type: TYPES.IMAGE,
            };
        },
        autocompleteDefaultLabelParams() {
            return {
                system: false,
                type: TYPES.TEXT,
            };
        },
        noImageAttributeDataPlaceholder() {
            return {
                title: this.$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.noImageTitle'),
                subtitle: this.$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.noImageSubtitle'),
            };
        },
        noTextAttributeDataPlaceholder() {
            return {
                title: this.$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.noLabelTitle'),
                subtitle: this.$t('@Attributes.productTemplate.components.ProductTemplateFormPresentation.noLabelSubtitle'),
            };
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
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
        dataCyGenerator(key) {
            return `template-${key}`;
        },
    },
};
</script>
