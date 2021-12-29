/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Trees.tree.components.CategoryTreeForm.title')"
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
                    :label="$t('@Trees.tree.components.CategoryTreeForm.nameLabel')"
                    :hint="$t('@Trees.tree.components.CategoryTreeForm.nameHint')"
                    @input="setCodeValue" />
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
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Trees/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('categoryTree', [
            'id',
            'code',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Trees/components/Forms/CategoryTreeForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.create,
            ]));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('categoryTree', [
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
            return `category-tree-${key}`;
        },
    },
};
</script>
