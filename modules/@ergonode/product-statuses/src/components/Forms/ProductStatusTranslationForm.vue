/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <template #appendHeader>
            <ReadOnlyBadge v-if="isReadOnly" />
        </template>
        <Form :errors="translationErrors">
            <template #body>
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(nameKeyField)"
                        :value="translations.name[languageCode]"
                        :label="$t('@Statuses.productStatus.components.ProductStatusTranslationForm.nameLabel')"
                        :error-messages="translationErrors[nameKeyField]"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        :label="$t('@Statuses.productStatus.components.ProductStatusTranslationForm.descriptionLabel')"
                        resize="none"
                        height="150px"
                        :error-messages="translationErrors[descriptionKeyField]"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        @input="(value) => setTranslationPropertyValue(
                            value,
                            descriptionKeyField,
                        )" />
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
import PRIVILEGES from '@Statuses/config/privileges';

export default {
    name: 'ProductStatusTranslationForm',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Statuses/components/Forms/ProductStatusTranslationForm',
            });
        },
        descriptionKeyField() {
            return 'description';
        },
        nameKeyField() {
            return 'name';
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate || this.isReadOnly,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.translationErrors,
                languageCode: this.languageCode,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `status-${key}_${this.languageCode}`;
        },
    },
};
</script>
