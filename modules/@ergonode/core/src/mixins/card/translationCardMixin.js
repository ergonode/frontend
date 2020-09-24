/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    getMappedTranslationErrors,
} from '@Core/models/mappers/errorsMapper';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        languageCode: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('tab', [
            'translations',
        ]),
        ...mapGetters('core', [
            'getActiveLanguageByCode',
        ]),
        translationErrors() {
            return getMappedTranslationErrors({
                errors: this.errors,
                languageCode: this.languageCode,
            });
        },
        selectedLanguage() {
            return this.getActiveLanguageByCode(this.languageCode).name || null;
        },
    },
    methods: {
        ...mapActions('tab', [
            'setTranslationValue',
        ]),
        setTranslationPropertyValue(value, propertyName) {
            this.setTranslationValue({
                languageCode: this.languageCode,
                propertyName,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: propertyName,
                value,
            });
        },
    },
};
