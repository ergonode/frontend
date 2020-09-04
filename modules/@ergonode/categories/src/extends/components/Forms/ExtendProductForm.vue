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
        :fetch-options-request="getCategoriesOptions"
        @input="setCategoriesValue" />
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ExtendProductForm',
    components: {
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('product', {
            categories: state => state.categories,
        }),
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
                key: 'categories',
                value,
            });
        },
    },
};
</script>
