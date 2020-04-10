/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <TranslationSelect
                :style="{ flex: '0 0 192px' }"
                v-model="selectedLanguages"
                :options="languageOptions"
                :solid="true"
                :small="true"
                :multiselect="true"
                :clearable="true"
                label="Translations" />
        </template>
        <template #centeredContent>
            <slot :language-codes="selectedLanguageCodes" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { TRANSLATIONS_LANGUAGES } from '@Core/defaults/cookies';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'TranslationsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        TranslationSelect,
    },
    data() {
        return {
            selectedLanguages: [],
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        languageOptions() {
            return Object.keys(this.languages).map(key => ({
                id: key, key, value: this.languages[key],
            }));
        },
        selectedLanguageCodes() {
            return this.selectedLanguages.map(language => language.id);
        },
    },
    watch: {
        selectedLanguages(value) {
            this.$cookies.set(TRANSLATIONS_LANGUAGES, value);
        },
    },
    created() {
        const cookieValue = this.$cookies.get(TRANSLATIONS_LANGUAGES);
        const isEveryLanguageExist = cookieValue
            ? cookieValue.every(e => this.languages[e.key])
            : null;

        if (cookieValue && isEveryLanguageExist) {
            this.selectedLanguages = cookieValue;
        } else {
            this.$cookies.remove(TRANSLATIONS_LANGUAGES);
            this.selectedLanguages = [
                {
                    id: this.userLanguageCode,
                    key: this.userLanguageCode,
                    value: this.languages[this.userLanguageCode],
                },
            ];
        }
    },
};
</script>
