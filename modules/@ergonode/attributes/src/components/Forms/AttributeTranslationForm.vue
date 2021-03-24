/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :errors="translationErrors">
            <template #body>
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(labelFieldKey)"
                        :value="translations.label[languageCode]"
                        :label="$t('@Attributes.attribute.components.AttributeTranslationForm.nameLabel')"
                        :error-messages="translationErrors[labelFieldKey]"
                        :disabled="!isAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, labelFieldKey)" />
                    <TextArea
                        :data-cy="dataCyGenerator(hintFieldKey)"
                        :value="translations.hint[languageCode]"
                        :label="$t('@Attributes.attribute.components.AttributeTranslationForm.hintLabel')"
                        resize="none"
                        height="150px"
                        :error-messages="translationErrors[hintFieldKey]"
                        :disabled="!isAllowedToUpdate"
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
import Card from '@UI/components/Card/Card';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextArea from '@UI/components/TextArea/TextArea';
import TextField from '@UI/components/TextField/TextField';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AttributeTranslationForm',
    components: {
        Card,
        Form,
        FormSection,
        Divider,
        TextField,
        TextArea,
    },
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
                disabled: !this.isAllowedToUpdate,
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
