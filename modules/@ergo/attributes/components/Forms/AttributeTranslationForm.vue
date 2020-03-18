/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Card :title="selectedLanguage">
        <Form :fields-keys="[labelFieldKey, placeholderFieldKey, hintFieldKey]">
            <template #body="{ errorMessages }">
                <FormGroup>
                    <TextField
                        :value="parsedValue('label')"
                        solid
                        label="Attribute name"
                        regular
                        :error-messages="errorMessages[labelFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'label')" />
                    <TextArea
                        v-if="hasPlaceholder"
                        :value="parsedValue('placeholder')"
                        solid
                        label="Placeholder"
                        resize="none"
                        :style="{height: '150px'}"
                        :error-messages="errorMessages[placeholderFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'placeholder')" />
                    <TextArea
                        :value="parsedValue('hint')"
                        solid
                        label="Tooltip for writers"
                        resize="none"
                        :style="{height: '150px'}"
                        :error-messages="errorMessages[hintFieldKey]"
                        :disabled="!isUserAllowedToUpdate"
                        @input="(value) => setTranslationPropertyValue(value, 'hint')" />
                    <template v-if="hasOptions">
                        <Divider />
                        <AttributeOptionValues
                            :language-code="languageCode"
                            :disabled="!isUserAllowedToUpdate" />
                    </template>
                </FormGroup>
            </template>
        </Form>
    </Card>
</template>

<script>
import { mapState } from 'vuex';
import { getKeyByValue } from '@Core/models/objectWrapper';
import { hasPlaceholder, hasOptions } from '@Attributes/models/attributeTypes';
import AttributeOptionValues from '@Attributes/components/Forms/Sections/AttributeOptionValues';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextField from '@Core/components/Inputs/TextField';
import TextArea from '@Core/components/Inputs/TextArea';
import Divider from '@Core/components/Dividers/Divider';
import Card from '@Core/components/Card/Card';
import Form from '@Core/components/Form/Form';
import FormGroup from '@Core/components/Form/FormGroup';

export default {
    name: 'AttributeTranslationForm',
    components: {
        Card,
        Form,
        FormGroup,
        Divider,
        TextField,
        TextArea,
        AttributeOptionValues,
    },
    mixins: [translationCardMixin],
    computed: {
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: state => state.type,
        }),
        hasPlaceholder() {
            return hasPlaceholder(this.typeKey);
        },
        hasOptions() {
            return hasOptions(this.typeKey);
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        hintFieldKey() {
            return `hint_${this.languageCode}`;
        },
        placeholderFieldKey() {
            return `placeholder_${this.languageCode}`;
        },
        labelFieldKey() {
            return `label_${this.languageCode}`;
        },
    },
};
</script>
