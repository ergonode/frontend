/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #header>
            <div class="translation-language-select">
                <LanguageSelect
                    :value="selectedLanguages"
                    data-cy="translation-language-select"
                    :label="$t('@Core.core.components.TranslationsTab.translationsSelectLabel')"
                    :size="smallSize"
                    :restricted-by-privileges="true"
                    :multiselect="true"
                    :clearable="true"
                    @input="onTranslationLanguageCodeChange" />
            </div>
        </template>
        <template #centeredContent>
            <slot :language-codes="selectedLanguages" />
        </template>
        <slot name="saveButton" />
    </CenterViewTemplate>
</template>

<script>
import LanguageSelect from '@Core/components/Selects/LanguageSelect';
import {
    TRANSLATIONS_LANGUAGES,
} from '@Core/defaults/cookies';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'TranslationsTab',
    components: {
        LanguageSelect,
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
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        ...mapGetters('core', [
            'availableLanguages',
            'defaultLanguageCode',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        cookieKey() {
            return `${TRANSLATIONS_LANGUAGES}_${this.$route.name}`;
        },
    },
    created() {
        const cookieLanguages = this.$userCookies.get(this.cookieKey) || [];
        const languagesToSelect = this.inheritedLanguagesTree.filter(
            language => cookieLanguages.some(
                cookieLanguage => cookieLanguage === language.code,
            ) && this.availableLanguages.some(
                availableLanguage => availableLanguage.code === language.code,
            ),
        );

        if (languagesToSelect.length === cookieLanguages.length && cookieLanguages.length > 0) {
            this.selectedLanguages = languagesToSelect.map(language => language.code);
        } else {
            const userLanguage = this.availableLanguages.find(
                language => language.code === this.userLanguageCode,
            );

            const languageCodeToSet = userLanguage
                ? userLanguage.code
                : this.defaultLanguageCode;

            this.selectedLanguages = [
                languageCodeToSet,
            ];

            this.$cookies.set(this.cookieKey, [
                languageCodeToSet,
            ]);
        }
    },
    methods: {
        onTranslationLanguageCodeChange(value) {
            this.selectedLanguages = value;

            this.$cookies.set(this.cookieKey, value);
        },
    },
};
</script>

<style lang="scss" scoped>
    .translation-language-select {
        flex: 0 0 192px;
    }
</style>
