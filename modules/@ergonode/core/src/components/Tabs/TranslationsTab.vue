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
                    label="Translations"
                    :size="smallSize"
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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapState,
} from 'vuex';

export default {
    name: 'TranslationsTab',
    components: {
        CenterViewTemplate,
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
        smallSize() {
            return SIZE.SMALL;
        },
        cookieKey() {
            return `${TRANSLATIONS_LANGUAGES}_${this.$route.name}`;
        },
    },
    created() {
        const cookieLanguages = this.$userCookies(this.cookieKey) || [];
        const languagesToSelect = this.inheritedLanguagesTree.filter(
            language => cookieLanguages.some(
                cookieLanguage => cookieLanguage === language.code,
            ),
        );

        if (languagesToSelect.length === cookieLanguages.length && cookieLanguages.length > 0) {
            this.selectedLanguages = languagesToSelect.map(language => language.code);
        } else {
            const userLanguage = this.inheritedLanguagesTree.find(
                language => language.code === this.userLanguageCode,
            );

            if (userLanguage) {
                this.selectedLanguages = [
                    userLanguage.code,
                ];

                this.$cookies.set(this.cookieKey, [
                    userLanguage.code,
                ]);
            }
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
