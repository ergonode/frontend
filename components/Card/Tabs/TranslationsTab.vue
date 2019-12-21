/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="language-selection-header">
                <Select
                    :value="cardsLanguageCodes"
                    :options="languageOptions"
                    solid
                    regular
                    label="Translations"
                    multiselect
                    @input="onLanguageCardSelected" />
            </div>
        </template>
        <template #content>
            <VerticalFixedScroll>
                <VerticalCenteredView>
                    <slot />
                </VerticalCenteredView>
            </VerticalFixedScroll>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Select from '@Core/components/Inputs/Select/Select';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '@Core/components/Layout/VerticalCenteredView';

export default {
    name: 'TranslationsTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        Select,
    },
    created() {
        if (!this.cardsLanguageCodes.find((langCode) => langCode === this.userLanguageCode)) {
            this.addCardLanguageCode({ languageCode: this.userLanguageCode });
        }
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('data', {
            languages: (state) => state.languages,
        }),
        ...mapState('translations', {
            cardsLanguageCodes: (state) => state.cardsLanguageCodes,
        }),
        languageOptions() {
            return Object.keys(this.languages).map((language) => ({
                id: language,
                name: this.languages[language],
            }));
        },
    },
    methods: {
        ...mapActions('translations', [
            'addCardLanguageCode',
            'setVisibleCardTranslations',
        ]),
        onLanguageCardSelected(languageCode) {
            this.setVisibleCardTranslations({
                languages: languageCode,
            });
        },
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
