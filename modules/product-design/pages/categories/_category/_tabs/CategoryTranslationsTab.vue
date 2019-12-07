/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <CategoryTranslationForm
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CategoryTranslationsTab',
    components: {
        TranslationsTab: () => import('~/components/Card/Tabs/TranslationsTab'),
        CategoryTranslationForm: () => import('~/components/Forms/CategoryTranslationForm'),
    },
    computed: {
        ...mapState('translations', {
            translations: (state) => state.translations,
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
