/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState } from 'vuex';
import { getValueByKey } from '~/model/objectWrapper';

export default {
    props: {
        languageCode: {
            type: String,
            required: false,
            default: '',
        },
        translations: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('data', {
            languages: state => state.languages,
        }),
        selectedLanguage() {
            return getValueByKey(this.languages, this.languageCode);
        },
        isTranslationChosen() {
            return this.languageCode !== '';
        },
    },
    methods: {
        setTranslationPropertyValue(value, propertyName) {
            this.$store.dispatch('translations/setTabTranslationPropertyValue', {
                languageCode: this.languageCode,
                propertyName,
                value,
            });
        },
    },
};
