/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                        label="Category name"
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
import PRIVILEGES from '@Categories/config/privileges';
import Card from '@Core/components/Card/Card';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/TextField/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'CategoryTranslationForm',
    components: {
        Divider,
        Form,
        FormSection,
        Card,
        TextField,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Categories/components/Forms/CategoryTranslationForm',
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
            return `category-${key}_${this.languageCode}`;
        },
    },
};
</script>
