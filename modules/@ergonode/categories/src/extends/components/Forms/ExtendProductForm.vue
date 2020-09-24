/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationLazySelect
        :value="categories"
        :multiselect="true"
        :clearable="true"
        label="Category"
        :disabled="disabled"
        :error-messages="errors[categoryFieldKey]"
        :fetch-options-request="getCategoriesOptions"
        @input="setCategoriesValue" />
</template>

<script>
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ExtendProductForm',
    components: {
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
        ...mapState('product', [
            'categories',
        ]),
        categoryFieldKey() {
            return 'categories';
        },
    },
    methods: {
        ...mapActions('product', [
            '__setState',
        ]),
        ...mapActions('category', [
            'getCategoriesOptions',
        ]),
        setCategoriesValue(value) {
            this.__setState({
                key: this.categoryFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.categoryFieldKey,
                value,
            });
        },
    },
};
</script>
