/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <OptionsHeader
            slot="header"
            :cards-language-codes="cardsLanguageCodes"
            :translations="translations"
            :default-translation="defaultTranslation" />
        <slot slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { setTransaltion, setDefaultTranslation } from '~/model/mappers/translationMapper';
import BaseTab from '~/components/Card/BaseTab';
import Footer from '~/components/ReusableFooter/Footer';

export default {
    name: 'TranslationsTab',
    components: {
        BaseTab,
        Footer,
        OptionsHeader: () => import('~/components/ReusableHeader/OptionsHeader'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
        defaultTranslation: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
            cardsLanguageCodes: state => state.cardsLanguageCodes,
        }),
    },
    created() {
        // Initialize card translation for user base language
        const { language: languageCode } = this.user;
        const translations = this.translations
            ? setTransaltion(this.translations, this.defaultTranslation, languageCode)
            : setDefaultTranslation(this.defaultTranslation, languageCode);
        this.setTabTranslations({ translations });
        if (!this.cardsLanguageCodes.find(langCode => langCode === languageCode)) {
            this.addCardLanguageCode({ languageCode });
        }
    },
    methods: {
        ...mapActions('translations', [
            'setTabTranslations',
            'addCardLanguageCode',
        ]),
    },
};
</script>
