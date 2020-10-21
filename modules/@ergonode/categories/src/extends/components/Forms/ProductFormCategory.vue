/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Autocomplete
        :value="categories"
        :multiselect="true"
        :clearable="true"
        :searchable="true"
        :sticky-search="true"
        label="Category"
        :disabled="disabled"
        :error-messages="errors[categoryFieldKey]"
        href="categories/autocomplete"
        @input="setCategoriesValue" />
</template>

<script>
import Autocomplete from '@Core/components/Autocomplete/Autocomplete';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductFormCategory',
    components: {
        Autocomplete,
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
