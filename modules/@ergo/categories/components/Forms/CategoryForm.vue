/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup title="General options">
            <TextField
                :value="code"
                solid
                regular
                required
                :error-messages="errorCodeMessage"
                :disabled="isDisabled || isDisabledByPrivileges"
                label="System name"
                hint="Category code must be unique"
                @input="setCategoryCode" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'CategoryForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    mixins: [errorValidationMixin],
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
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('categories', ['setCategoryCode']),
    },
};
</script>
