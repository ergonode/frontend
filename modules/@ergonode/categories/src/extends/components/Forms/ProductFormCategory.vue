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
import PRIVILEGES from '@Categories/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
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
        placeholder() {
            return {
                title: 'No categories',
                subtitle: 'There are no categories in the system, so you can create the first one.',
            };
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
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
