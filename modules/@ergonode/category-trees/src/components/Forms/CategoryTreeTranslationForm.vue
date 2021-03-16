/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :errors="translationErrors">
            <template #body>
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(nameFieldKey)"
                        :value="translations.name[languageCode]"
                        :label="$t('@Trees.tree.components.CategoryTreeTranslationForm.nameLabel')"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[nameFieldKey]"
                        @input="(value) => setTranslationPropertyValue(value, nameFieldKey)" />
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
    </Card>
</template>

<script>
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Trees/config/privileges';
import Card from '@UI/components/Card/Card';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'CategoryTreeTranslationForm',
    components: {
        Divider,
        FormSection,
        Form,
        Card,
        TextField,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Attributes/components/Forms/CategoryTreeTranslationForm',
            });
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.translationErrors,
                languageCode: this.languageCode,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `category-tree-${key}_${this.languageCode}`;
        },
    },
};
</script>
