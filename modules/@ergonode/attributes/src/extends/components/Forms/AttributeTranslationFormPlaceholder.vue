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
        :disabled="!isUserAllowedToUpdate"
        @input="(value) => setTranslationPropertyValue(value, 'placeholder')" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import TextArea from '@Core/components/Inputs/TextArea';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeTranslationFormPlaceholder',
    components: {
        TextArea,
    },
    mixins: [
        translationCardMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        isUserAllowedToUpdate() {
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
            return `attribute-${key}`;
        },
    },
};
</script>
