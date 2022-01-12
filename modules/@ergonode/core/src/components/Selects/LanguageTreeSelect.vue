/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreeSelect
        :value="language"
        :label="label"
        :size="smallSize"
        :options="languageOptions"
        option-key="key"
        option-value="value"
        @input="onSelect" />
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapState,
} from 'vuex';

export default {
    name: 'LanguageTreeSelect',
    props: {
        value: {
            type: String,
            default: '',
        },
        label: {
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
        language() {
            return this.languageOptions.find(
                languageCode => languageCode.code === this.value,
            ) || null;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        languageOptions() {
            return this.inheritedLanguagesTree.map(language => ({
                ...language,
                level: language.column,
                key: language.code,
                value: language.name,
                disabled: this.languagePrivileges[language.code]
                    ? !this.languagePrivileges[language.code].read
                    : true,
            }));
        },
    },
    methods: {
        onSelect(value) {
            this.$emit('input', value ? value.key : '');
        },
    },
};
</script>
