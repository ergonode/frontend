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
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    required
                    label="Type"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[typeIdFieldKey]"
                    :fetch-options-request="getCollectionTypeOptions"
                    @input="setTypeValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionForm',
    components: {
        Form,
        FormSection,
        TextField,
        TranslationLazySelect,
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
        ...mapState('collection', {
            id: state => state.id,
            code: state => state.code,
            type: state => state.type,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        typeIdFieldKey() {
            return 'typeId';
        },
        typeFieldKey() {
            return 'type';
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('collection', [
            '__setState',
            'getCollectionTypeOptions',
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
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
