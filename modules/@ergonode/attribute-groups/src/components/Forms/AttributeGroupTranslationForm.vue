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
                        :label="$t('@AttributeGroups.attributeGroup.components.AttributeGroupTranslationForm.nameLabel')"
                        :disabled="!isAllowedToUpdate || isReadOnly"
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
import PRIVILEGES from '@AttributeGroups/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeGroupTranslationForm',
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
                key: '@AttributeGroups/components/Forms/AttributeGroupTranslationForm',
            });
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
            return `attribute-group-${key}_${this.languageCode}`;
        },
    },
};
</script>
