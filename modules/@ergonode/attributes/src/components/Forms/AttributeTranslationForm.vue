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
                        :data-cy="dataCyGenerator(labelFieldKey)"
                        :value="translations.label[languageCode]"
                        :label="$t('@Attributes.attribute.components.AttributeTranslationForm.nameLabel')"
                        :error-messages="translationErrors[labelFieldKey]"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        @input="(value) => setTranslationPropertyValue(value, labelFieldKey)" />
                    <TextArea
                        :data-cy="dataCyGenerator(hintFieldKey)"
                        :value="translations.hint[languageCode]"
                        :label="$t('@Attributes.attribute.components.AttributeTranslationForm.hintLabel')"
                        resize="none"
                        height="150px"
                        :error-messages="translationErrors[hintFieldKey]"
                        :disabled="!isAllowedToUpdate || isReadOnly"
                        @input="(value) => setTranslationPropertyValue(value, hintFieldKey)" />
                    <template v-for="(formComponent, index) in extendedForm">
                        <Component
                            :is="formComponent.component"
                            :key="index"
                            v-bind="bindingProps(formComponent)" />
                    </template>
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AttributeTranslationForm',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        ...mapState('attribute', [
            'type',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Attributes/components/Forms/AttributeTranslationForm',
                type: this.typeKey,
            });
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        hintFieldKey() {
            return 'hint';
        },
        labelFieldKey() {
            return 'label';
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate || this.isReadOnly,
                typeKey: this.typeKey,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.translationErrors,
                languageCode: this.languageCode,
                ...props,
            };
        },
        dataCyGenerator(key) {
            return `attribute-${key}_${this.languageCode}`;
        },
    },
};
</script>
