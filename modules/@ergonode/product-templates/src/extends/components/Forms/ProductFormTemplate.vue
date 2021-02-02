/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateAutocomplete
        :value="template"
        :required="true"
        :searchable="true"
        :error-messages="errors[templateIdFieldKey]"
        :disabled="disabled"
        @input="onTemplateValueChange" />
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import ProductTemplateAutocomplete from '@Templates/components/Autocompletes/ProductTemplatesAutocomplete';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductFormTemplate',
    components: {
        ProductTemplateAutocomplete,
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
        ...mapState('product', [
            'template',
        ]),
        templateIdFieldKey() {
            return 'templateId';
        },
    },
    methods: {
        ...mapActions('product', [
            '__setState',
        ]),
        onTemplateValueChange(value) {
            this.__setState({
                key: 'template',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'template',
                value,
            });
        },
    },
};
</script>
