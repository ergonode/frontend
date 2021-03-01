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
                        :data-cy="dataCyGenerator(nameKeyField)"
                        :value="translations.name[languageCode]"
                        :label="$t('@Attributes.attributeGroup.components.AttributeGroupTranslationForm.nameLabel')"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
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
import PRIVILEGES from '@Attributes/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import Card from '@UI/components/Card/Card';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'AttributeGroupTranslationForm',
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
                PRIVILEGES.ATTRIBUTE_GROUP.update,
            ]);
        },
        nameKeyField() {
            return 'name';
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Attributes/components/Forms/AttributeGroupTranslationForm',
            });
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
            return `attribute-group-${key}_${this.languageCode}`;
        },
    },
};
</script>
