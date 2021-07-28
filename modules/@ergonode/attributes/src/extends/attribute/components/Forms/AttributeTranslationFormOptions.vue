/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionValues
        :language-code="languageCode"
        :scope="scope"
        :change-values="changeValues"
        :errors="errors"
        :disabled="!isAllowedToUpdate || isReadOnly" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import AttributeOptionValues from '@Attributes/extends/attribute/components/Forms/Sections/AttributeOptionValues';
import translationCardMixin from '@Core/mixins/card/translationCardMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AttributeTranslationFormOptions',
    components: {
        AttributeOptionValues,
    },
    mixins: [
        translationCardMixin,
    ],
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        isReadOnly() {
            return !this.languagePrivileges[this.languageCode].edit;
        },
    },
};
</script>
