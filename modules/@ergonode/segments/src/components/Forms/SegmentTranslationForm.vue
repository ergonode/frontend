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
                        :label="$t('@Segments.segment.components.SegmentTranslationForm.conditionSetNameLabel')"
                        :error-messages="translationErrors[nameKeyField]"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        @input="(value) => setTranslationPropertyValue(value, nameKeyField)" />
                    <TextArea
                        :data-cy="dataCyGenerator(descriptionKeyField)"
                        :value="translations.description[languageCode]"
                        :label="$t('@Segments.segment.components.SegmentTranslationForm.descriptionLabel')"
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
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Segments/config/privileges';

export default {
    name: 'SegmentTranslationForm',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Segments/components/Forms/SegmentTranslationForm',
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
            return `segment-${key}_${this.languageCode}`;
        },
    },
};
</script>
