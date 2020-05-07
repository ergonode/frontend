/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    data-cy="categoryName"
                    :value="code"
                    solid
                    regular
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Category code must be unique"
                    @input="setCategoryCode" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CategoryForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    computed: {
        ...mapState('categories', {
            categoryID: state => state.id,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.categoryID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['CATEGORY_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['CATEGORY_CREATE']));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('categories', ['setCategoryCode']),
    },
};
</script>
