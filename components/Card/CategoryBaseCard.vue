/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="code"
            solid
            regular
            required
            :error-messages="errorCodeMessage"
            :disabled="isDisabled"
            label="Code"
            hint="Category code must be unique"
            @input="(code) => setAction({ key: 'code', value: code })" />
    </BaseCard>
</template>

<script>
import BaseCard from '~/components/Card/BaseCard';
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'CategoryBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
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
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('categories', [
            'setAction',
        ]),
    },
};
</script>
