/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab
        :update-button="updateButton">
        <ConditionSetTranslationCard
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConditionSetTranslationsTab',
    components: {
        TranslationsTab: () => import('~/components/Card/Tabs/TranslationsTab'),
        ConditionSetTranslationCard: () => import('~/components/Card/Cards/ConditionSetTranslationCard'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('translations', {
            translations: (state) => state.translations,
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
