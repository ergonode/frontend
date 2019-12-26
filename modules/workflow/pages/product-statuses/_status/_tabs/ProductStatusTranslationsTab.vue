/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationsTab>
        <ProductStatusTranslationForm
            v-for="(languageCode, index) in cardsLanguageCodes"
            :key="index"
            :language-code="languageCode" />
    </TranslationsTab>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ProductStatusTranslationsTab',
    components: {
        TranslationsTab: () => import('@Core/components/Card/Tabs/TranslationsTab'),
        ProductStatusTranslationForm: () => import('~/components/Forms/ProductStatusTranslationForm'),
    },
    computed: {
        ...mapState('translations', {
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
};
</script>
