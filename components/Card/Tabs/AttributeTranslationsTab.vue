/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab
        :update-button="updateButton">
        <AttributeTranslationCard
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
        TranslationsTab: () => import('~/components/Card/Tabs/TranslationsTab'),
        AttributeTranslationCard: () => import('~/components/Card/Cards/AttributeTranslationCard'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('translations', {
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
