/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="language-selection-header">
                <TranslationSelect
                    v-model="selectedLanguages"
                    :options="languageOptions"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    label="Translations" />
            </div>
        </template>
        <template #centeredContent>
            <slot :language-codes="selectedLanguageCodes" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
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
    created() {
        this.selectedLanguages = [
            {
                id: this.userLanguageCode,
                key: this.userLanguageCode,
                value: this.languages[this.userLanguageCode],
            },
        ];
    },
};
</script>

<style lang="scss" scoped>
    .language-selection-header {
        display: flex;
        flex: 0 0 196px;
        align-items: center;
        min-height: 55px;
    }
</style>
