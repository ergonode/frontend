/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextArea
        :data-cy="dataCyGenerator(placeholderFieldKey)"
        :value="translations.placeholder[languageCode]"
        :label="$t('@Attributes.attributeExtend.components.AttributeTranslationFormPlaceholder.placeholderLabel')"
        resize="none"
        height="150px"
        :error-messages="errors[placeholderFieldKey]"
        :disabled="!isAllowedToUpdate"
        @input="(value) => setTranslationPropertyValue(value, placeholderFieldKey)" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeTranslationFormPlaceholder',
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        placeholderFieldKey() {
            return 'placeholder';
        },
    },
    methods: {
        dataCyGenerator(key) {
            return `attribute-${key}_${this.languageCode}`;
        },
    },
};
</script>
