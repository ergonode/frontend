/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[
            typeIdFieldKey,
            codeFieldKey,
        ]"
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
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    required
                    label="Type"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errorMessages[typeIdFieldKey]"
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
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('collection', [
            '__setState',
            'getCollectionTypeOptions',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: 'type',
                value,
            });
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
