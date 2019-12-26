/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <AttributeTranslationForm
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AttributeTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        AttributeTranslationForm: () => import('~/components/Forms/AttributeTranslationForm'),
    },
    computed: {
        ...mapState('translations', {
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
