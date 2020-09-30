/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionValues
        :language-code="languageCode"
        :scope="scope"
        :change-values="changeValues"
        :errors="errors"
        :disabled="!isUserAllowedToUpdate" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import AttributeOptionValues from '@Attributes/extends/components/Forms/Sections/AttributeOptionValues';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeTranslationFormOptions',
    components: {
        AttributeOptionValues,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
    },
};
</script>
