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
        :fetch-options-request="getCategoriesOptionsRequest"
        @input="setCategoriesValue" />
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';

const getCategoriesOptions = () => import('@Categories/services/getCategoriesOptions.service');

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
        setCategoriesValue(value) {
            this.__setState({
                key: 'categories',
                value,
            });
        },
        getCategoriesOptionsRequest() {
            return getCategoriesOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
    },
};
</script>
