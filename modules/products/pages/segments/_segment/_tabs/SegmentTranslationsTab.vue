/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <SegmentsTranslationForm
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SegmentTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        SegmentsTranslationForm: () => import('~/components/Forms/SegmentsTranslationForm'),
    },
    computed: {
        ...mapState('translations', {
            translations: (state) => state.translations,
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
