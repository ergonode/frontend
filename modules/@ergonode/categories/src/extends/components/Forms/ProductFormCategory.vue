/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategorySelect
        :value="categories"
        :disabled="!isAllowedToUpdate"
        @input="onCategoriesValueChange" />
</template>

<script>
import CategorySelect from '@Categories/components/Selects/CategorySelect';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import PRIVILEGES from '@Products/config/privileges';
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
            'id',
            'categories',
        ]),
        categoryFieldKey() {
            return 'categories';
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.PRODUCT.create,
            ]));
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
