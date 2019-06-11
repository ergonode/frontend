/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab :update-button="updateButton">
        <OptionsHeader
            slot="header"
            :cards-language-codes="cardsLanguageCodes"
            :default-translation="defaultTranslation" />
        <slot slot="content" />
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </BaseTab>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('translations', {
            cardsLanguageCodes: state => state.cardsLanguageCodes,
        }),
    },
    created() {
        if (!this.cardsLanguageCodes.find(langCode => langCode === this.userLanguageCode)) {
            this.addCardLanguageCode({ languageCode: this.userLanguageCode });
        }
    },
    methods: {
        ...mapActions('translations', [
            'addCardLanguageCode',
            'clearTranslations',
        ]),
    },
};
</script>
