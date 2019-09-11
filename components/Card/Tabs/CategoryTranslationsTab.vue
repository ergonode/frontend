/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab
        :update-button="updateButton">
        <CategoryTranslationCard
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode"
            :translations="translations" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CategoryTranslationsTab',
    components: {
        TranslationsTab: () => import('~/components/Card/TranslationsTab'),
        CategoryTranslationCard: () => import('~/components/Card/CategoryTranslationCard'),
    },

    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('translations', {
            translations: state => state.translations,
            cardsLanguageCodes: state => state.cardsLanguageCodes,
        }),
    },
};
</script>
