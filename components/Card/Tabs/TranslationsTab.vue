/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #header>
            <div class="language-selection-header">
                <Select
                    :value="selectedLanguageCards"
                    :options="languagesValues"
                    solid
                    regular
                    label="Translations"
                    multiselect
                    @input="onLanguageCardSelected" />
            </div>
        </template>
        <template #content>
            <BaseForm>
                <slot />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeysByValues, getValuesByKeys } from '~/model/objectWrapper';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import Footer from '~/components/ReusableFooter/Footer';
import Select from '~/components/Inputs/Select/Select';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'TranslationsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Footer,
        Select,
        BaseForm,
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
        languagesValues() {
            return Object.values(this.languages);
        },
        selectedLanguageCards() {
            const languageNames = getValuesByKeys(this.languages, this.cardsLanguageCodes);

            return this.languagesValues.filter(
                (language) => languageNames.some(
                    (name) => name === language,
                ),
            );
        },
    },
    methods: {
        ...mapActions('translations', [
            'addCardLanguageCode',
            'setVisibleCardTranslations',
        ]),
        onLanguageCardSelected(languageCode) {
            const languageCodes = getKeysByValues(this.languages, languageCode);

            this.setVisibleCardTranslations({
                languages: languageCodes,
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
