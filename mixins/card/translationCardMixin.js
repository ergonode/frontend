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
        ...mapActions('translations', [
            'setTabTranslationPropertyValue',
        ]),
        setTranslationPropertyValue(value, propertyName) {
            this.setTabTranslationPropertyValue({
                languageCode: this.languageCode,
                propertyName,
                value,
            });
        },
    },
};
