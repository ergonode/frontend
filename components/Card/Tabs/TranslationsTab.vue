/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <OptionsHeader
            slot="header"
            :cards-language-codes="cardsLanguageCodes" />
        <template #content>
            <div class="translation-cards">
                <slot />
            </div>
        </template>
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';
import OptionsHeader from '~/components/ReusableHeader/OptionsHeader';

export default {
    name: 'TranslationsTab',
    components: {
        BaseTab,
        Footer,
        OptionsHeader,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('data', {
            languages: (state) => state.languages,
        }),
        ...mapState('translations', {
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
    },
    created() {
        if (!this.cardsLanguageCodes.find((langCode) => langCode === this.userLanguageCode)) {
            this.addCardLanguageCode({ languageCode: this.userLanguageCode });
        }
    },
    methods: {
        ...mapActions('translations', [
            'addCardLanguageCode',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .translation-cards {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: max-content;
        justify-content: center;
        width: 0;
    }
</style>
