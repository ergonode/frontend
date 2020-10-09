/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :errors="translationErrors">
            <template #body>
                <FormSection>
                    <TextArea
                        :data-cy="dataCyGenerator(altKeyField)"
                        :value="translations.alt[languageCode]"
                        label="Alternate text"
                        resize="none"
                        height="150px"
                        :disabled="!isAllowedToUpdate"
                        :error-messages="translationErrors[altKeyField]"
                        @input="(value) => setTranslationPropertyValue(value, altKeyField)" />
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
import Card from '@Core/components/Card/Card';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/TextArea/TextArea';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'ResourceTranslationForm',
    components: {
        Divider,
        FormSection,
        Form,
        Card,
        TextArea,
    },
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
            return this.$getExtendedFormByType({
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
                disabled: !this.isAllowedToUpdate,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.translationErrors,
                languageCode: this.languageCode,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `media-${key}`;
        },
    },
};
</script>
