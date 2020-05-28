/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        ...mapGetters('core', [
            'getActiveLanguageByCode',
        ]),
        selectedLanguage() {
            return this.getActiveLanguageByCode(this.languageCode).name || null;
        },
    },
    methods: {
        ...mapActions('translations', [
            'setMultilingualTranslationPropertyValue',
        ]),
        setTranslationPropertyValue(value, propertyName) {
            this.setMultilingualTranslationPropertyValue({
                languageCode: this.languageCode,
                propertyName,
                value,
            });
        },
    },
};
