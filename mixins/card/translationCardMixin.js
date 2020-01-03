/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';
import { isObject, getValueByKey } from '~/model/objectWrapper';

export default {
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('data', {
            languages: (state) => state.languages,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
        selectedLanguage() {
            return getValueByKey(this.languages, this.languageCode);
        },
    },
    methods: {
        ...mapActions('translations', [
            'setMultilingualTranslationPropertyValue',
        ]),
        parsedValue(propertyName) {
            const property = this.translations[propertyName];
            return isObject(property) ? property[this.languageCode] : property;
        },
        setTranslationPropertyValue(value, propertyName, isMultilingual = true) {
            this.setMultilingualTranslationPropertyValue({
                languageCode: this.languageCode,
                propertyName,
                value,
                isMultilingual,
            });
        },
    },
};
