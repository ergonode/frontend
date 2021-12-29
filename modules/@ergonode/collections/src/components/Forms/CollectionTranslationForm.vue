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
                        :label="$t('@Collections.collection.components.CollectionTranslationForm.collectionNameLabel')"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        :error-messages="translationErrors[nameKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        :label="$t('@Collections.collection.components.CollectionTranslationForm.descriptionLabel')"
                        resize="vertical"
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
import PRIVILEGES from '@Collections/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'CollectionTranslationForm',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Collections/components/Forms/CollectionTranslationForm',
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
            return `collection-${key}_${this.languageCode}`;
        },
    },
};
</script>
