/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :value="languagesValue"
        :label="label"
        :size="size"
        :search-value="searchValue"
        :multiselect="multiselect"
        :clearable="clearable"
        :searchable="searchable"
        :required="required"
        :disabled="disabled"
        :options="languageOptions"
        :error-messages="errorMessages"
        :data-cy="dataCy"
        option-key="key"
        option-value="value"
        @input="onSelect"
        @search="onDebounceSearch" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    debounce,
} from 'debounce';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'LanguageSelect',
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
        searchable: {
            type: Boolean,
            default: false,
        },
        restrictedByPrivileges: {
            type: Boolean,
            default: false,
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            searchValue: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', [
            'languages',
        ]),
        ...mapGetters('core', [
            'availableLanguages',
        ]),
        languagesValue() {
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
            const lowerCaseSearchValue = this.searchValue.toLowerCase();

            const options = this.restrictedByPrivileges
                ? this.availableLanguages
                : this.languages;

            return options
                .map(language => ({
                    id: language.id,
                    key: language.code,
                    value: language.name || `#${language.key}`,
                }))
                .filter(option => (
                    option.value || option.key
                ).toLowerCase().includes(lowerCaseSearchValue))
                .sort((a, b) => {
                    const fieldA = a.value || a.key;
                    const fieldB = b.value || b.key;

                    return fieldA.toLowerCase().localeCompare(fieldB.toLowerCase());
                });
        },
    },
    created() {
        this.onDebounceSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.onDebounceSearch;
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
        onSearch(value) {
            this.searchValue = value;
        },
    },
};
</script>
