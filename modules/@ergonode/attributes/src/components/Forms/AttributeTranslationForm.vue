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
                        :data-cy="dataCyGenerator(labelFieldKey)"
                        :value="translations.label[languageCode]"
                        :label="$t('attribute.translation.nameLabel')"
                        :error-messages="translationErrors[labelFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, labelFieldKey)" />
                    <TextArea
                        :data-cy="dataCyGenerator(hintFieldKey)"
                        :value="translations.hint[languageCode]"
                        :label="$t('attribute.translation.hintLabel')"
                        resize="none"
                        height="150px"
                        :error-messages="translationErrors[hintFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, hintFieldKey)" />
                    <Divider v-if="formComponent.component" />
                    <Component
                        :is="formComponent.component"
                        :type-key="typeKey"
                        :scope="scope"
                        :change-values="changeValues"
                        :errors="translationErrors"
                        :language-code="languageCode"
                        v-bind="formComponent.props" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import Card from '@Core/components/Card/Card';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import TextField from '@Core/components/Inputs/TextField';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
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
        formComponent() {
            const extendedComponents = this.$getExtendedComponents('@Attributes/components/Forms/AttributeTranslationForm');

            if (extendedComponents && extendedComponents[this.typeKey]) {
                return extendedComponents[this.typeKey];
            }

            return {};
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isUserAllowedToUpdate() {
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
        dataCyGenerator(key) {
            return `attribute-${key}_${this.languageCode}`;
        },
    },
};
</script>
