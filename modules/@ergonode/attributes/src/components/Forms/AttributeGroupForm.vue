/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[codeFieldKey]"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    label="System name"
                    hint="System name must be unique"
                    @input="setCodeValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeGroupForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    mixins: [
        formActionsMixin,
    ],
    computed: {
        ...mapState('attributeGroup', {
            id: state => state.id,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.update,
            ]);
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('attributeGroup', [
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-group-${key}`;
        },
    },
};
</script>
