/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab
        :update-button="updateButton">
        <SegmentsTranslationCard
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode"
            :translations="translations" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConditionSetTranslationsTab',
    components: {
        TranslationsTab: () => import('~/components/Card/TranslationsTab'),
        SegmentsTranslationCard: () => import('~/components/Card/SegmentsTranslationCard'),
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
