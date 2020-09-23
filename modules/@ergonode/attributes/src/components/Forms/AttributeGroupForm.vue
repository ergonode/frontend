/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errors[codeFieldKey]"
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
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeGroupForm',
    components: {
        Form,
        FormSection,
        TextField,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
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
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: this.codeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-group-${key}`;
        },
    },
};
</script>
