/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form
            :fields-keys="[
                labelFieldKey,
                hintFieldKey,
                ...extendedFieldKeys,
            ]">
            <template #body="{ errorMessages }">
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(labelFieldKey)"
                        :value="translations.label[languageCode]"
                        label="Attribute name"
                        :error-messages="errorMessages[labelFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'label')" />
                    <TextArea
                        :data-cy="dataCyGenerator(hintFieldKey)"
                        :value="translations.hint[languageCode]"
                        label="Tooltip for writers"
                        resize="none"
                        height="150px"
                        :error-messages="errorMessages[hintFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'hint')" />
                    <Divider />
                    <Component
                        :is="formComponent.component"
                        :type-key="typeKey"
                        :error-messages="errorMessages"
                        :language-code="languageCode"
                        v-bind="formComponent.props"
                        @fieldKeys="onFieldKeys" />
                </FormSection>
            </template>
        </Form>
    </Card>
</template>

<script>
import AttributeOptionValues from '@Attributes/components/Forms/Sections/AttributeOptionValues';
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
        AttributeOptionValues,
    },
    mixins: [
        translationCardMixin,
    ],
    data() {
        return {
            extendedFieldKeys: [],
        };
    },
    computed: {
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: state => state.type,
        }),
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
            return `hint_${this.languageCode}`;
        },
        labelFieldKey() {
            return `label_${this.languageCode}`;
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
        onFieldKeys(fields) {
            this.extendedFieldKeys = fields;
        },
    },
};
</script>
