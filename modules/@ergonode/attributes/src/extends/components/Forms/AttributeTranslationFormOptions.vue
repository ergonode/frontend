/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionValues
        :language-code="languageCode"
        :errors="errors"
        :disabled="!isUserAllowedToUpdate" />
</template>

<script>
import AttributeOptionValues from '@Attributes/components/Forms/Sections/AttributeOptionValues';
import PRIVILEGES from '@Attributes/config/privileges';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';

export default {
    name: 'AttributeTranslationFormOptions',
    components: {
        AttributeOptionValues,
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
    },
};
</script>
