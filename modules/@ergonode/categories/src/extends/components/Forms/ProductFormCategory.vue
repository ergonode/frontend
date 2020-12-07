/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategorySelect
        :value="categories"
        @input="onCategoriesValueChange" />
</template>

<script>
import CategorySelect from '@Categories/components/Selects/CategorySelect';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductFormCategory',
    components: {
        CategorySelect,
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
        onCategoriesValueChange(value) {
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
