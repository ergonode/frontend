/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TextArea
        :data-cy="dataCyGenerator(placeholderFieldKey)"
        :value="translations.placeholder[languageCode]"
        label="Placeholder"
        resize="none"
        height="150px"
        :error-messages="errors[placeholderFieldKey]"
        :disabled="!isAllowedToUpdate"
        @input="(value) => setTranslationPropertyValue(value, placeholderFieldKey)" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import TextArea from '@UI/components/TextArea/TextArea';

export default {
    name: 'AttributeTranslationFormPlaceholder',
    components: {
        TextArea,
    },
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
