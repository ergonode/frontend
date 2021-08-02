/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Collections.collection.components.CollectionForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
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
                    :label="$t('@Collections.collection.components.CollectionForm.nameLabel')"
                    :hint="$t('@Collections.collection.components.CollectionForm.nameHint')"
                    @input="setCodeValue" />
                <CollectionTypesAutocomplete
                    :data-cy="dataCyGenerator(typeIdFieldKey)"
                    :value="type"
                    required
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :error-messages="errors[typeIdFieldKey]"
                    @input="setTypeValue" />
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
import CollectionTypesAutocomplete from '@Collections/components/Autocompletes/CollectionTypesAutocomplete';
import PRIVILEGES from '@Collections/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CollectionForm',
    components: {
        CollectionTypesAutocomplete,
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
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.create,
            ]));
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
