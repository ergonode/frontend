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
            hint="Attribute group code must be unique"
            @input="setAttributeGroupCode" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'AttributeGroupBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('attributeGroup', {
            attributeID: (state) => state.id,
            code: (state) => state.code,
        }),
        isDisabled() {
            return Boolean(this.attributeID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['ATTRIBUTE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['ATTRIBUTE_CREATE']));
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
    },
    methods: {
        ...mapActions('attributeGroup', ['setAttributeGroupCode']),
    },
};
</script>
