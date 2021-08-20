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
                    <TextArea
                        :data-cy="dataCyGenerator(altKeyField)"
                        :value="translations.alt[languageCode]"
                        :label="$t('@Media.media.components.ResourceTranslationForm.altLabel')"
                        resize="none"
                        height="150px"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        :error-messages="translationErrors[altKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, altKeyField)" />
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
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'ResourceTranslationForm',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        extendedForm() {
            return this.$extendedForm({
                key: '@Media/components/Forms/ResourceTranslationForm',
            });
        },
        altKeyField() {
            return 'alt';
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
            return `resource-${key}_${this.languageCode}`;
        },
    },
};
</script>
