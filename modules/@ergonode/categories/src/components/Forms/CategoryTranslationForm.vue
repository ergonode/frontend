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
                        :data-cy="dataCyGenerator(nameFieldKey)"
                        :value="translations.name[languageCode]"
                        :label="$t('@Categories.category.components.CategoryTranslationForm.labelName')"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        :error-messages="translationErrors[nameFieldKey]"
                        @input="(value) => setTranslationPropertyValue(value, nameFieldKey)" />
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
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'CategoryTranslationForm',
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
                disabled: !this.isAllowedToUpdate || this.isReadOnly,
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
