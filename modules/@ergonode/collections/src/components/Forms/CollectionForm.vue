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
                <Divider v-if="extendedForm.length" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TranslationLazySelect from '@Core/components/Select/TranslationLazySelect';
import TextField from '@Core/components/TextField/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionForm',
    components: {
        Divider,
        Form,
        FormSection,
        TextField,
        TranslationLazySelect,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('collection', [
            'id',
            'code',
            'type',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Collections/components/Forms/CollectionForm',
                type: this.type,
            });
        },
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
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `collection-${key}`;
        },
    },
};
</script>
