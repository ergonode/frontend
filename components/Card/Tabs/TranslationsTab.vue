/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="language-selection-header">
                <Select
                    :value="selectedLanguages"
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
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getValueByKey } from '~/model/objectWrapper';
import ResponsiveCenteredViewTemplate from '~/core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import Select from '~/core/components/Inputs/Select/Select';
import VerticalFixedScroll from '~/core/components/Layout/Scroll/VerticalFixedScroll';
import VerticalCenteredView from '~/core/components/Layout/VerticalCenteredView';

export default {
    name: 'TranslationsTab',
    components: {
        VerticalCenteredView,
        VerticalFixedScroll,
        ResponsiveCenteredViewTemplate,
        Footer,
        Select,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
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
                key: language,
                value: this.languages[language],
            }));
        },
        selectedLanguages() {
            return this.cardsLanguageCodes.reduce((acc, current) => {
                const newObject = acc;
                newObject[current] = getValueByKey(this.languages, current);
                return newObject;
            }, {});
        },
    },
    methods: {
        ...mapActions('translations', [
            'addCardLanguageCode',
            'setVisibleCardTranslations',
        ]),
        onLanguageCardSelected(languageCode) {
            this.setVisibleCardTranslations({
                languages: Object.keys(languageCode),
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
