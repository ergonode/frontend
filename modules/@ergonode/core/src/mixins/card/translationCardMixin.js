/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    getMappedTranslationErrors,
} from '@Core/models/mappers/errorsMapper';
import {
    mapActions,
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
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        translationErrors() {
            return getMappedTranslationErrors({
                errors: this.errors,
                languageCode: this.languageCode,
            });
        },
        selectedLanguage() {
            const language = this.inheritedLanguagesTree.find(({
                code,
            }) => code === this.languageCode);

            if (!language) {
                return '';
            }

            return language.name;
        },
        isReadOnly() {
            return !this.languagePrivileges[this.languageCode].edit;
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
