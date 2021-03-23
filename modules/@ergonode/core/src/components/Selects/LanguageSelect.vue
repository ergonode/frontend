/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TranslationSelect
        :value="languages"
        :label="label"
        :size="size"
        :multiselect="multiselect"
        :clearable="clearable"
        :required="required"
        :disabled="disabled"
        :options="languageOptions"
        :error-messages="errorMessages"
        :data-cy="dataCy"
        @input="onSelect" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import TranslationSelect from '@UI/components/Select/TranslationSelect';
import {
    mapState,
} from 'vuex';

export default {
    name: 'LanguageSelect',
    components: {
        TranslationSelect,
    },
    props: {
        value: {
            type: [
                Array,
                String,
            ],
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        dataCy: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        languages() {
            if (this.multiselect) {
                return this.languageOptions.filter(
                    language => this.value.some(
                        languageCode => languageCode === language.key,
                    ),
                );
            }

            return this.languageOptions.find(
                languageCode => languageCode.key === this.value,
            );
        },
        languageOptions() {
            return this.inheritedLanguagesTree
                .filter(language => this.languagePrivileges[language.code]
                        && this.languagePrivileges[language.code].read)
                .map(language => ({
                    id: language.id,
                    key: language.code,
                    value: language.name,
                }));
        },
    },
    methods: {
        onSelect(value) {
            let languageCodes = value ? value.key : '';

            if (this.multiselect) {
                languageCodes = value.map(({
                    key,
                }) => key);
            }

            this.$emit('input', languageCodes);
        },
    },
};
</script>
