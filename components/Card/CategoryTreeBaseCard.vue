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
            :disabled="isDisabled || isDisabledByPrivileges"
            label="Code"
            hint="Tree code must be unique"
            @input="setTreeCode($event)"
        />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'CategoryTreeBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('tree', {
            treeID: state => state.treeId,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.treeID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess('CATEGORY_TREE_UPDATE'))
            || (!this.isDisabled && !this.$hasAccess('CATEGORY_TREE_CREATE'));
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('tree', ['setTreeCode']),
    },
};
</script>
