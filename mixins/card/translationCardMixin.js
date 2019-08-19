/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';
import { getValueByKey } from '~/model/objectWrapper';

export default {
    props: {
        languageCode: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        selectedLanguage() {
            return getValueByKey(this.languages, this.languageCode);
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
