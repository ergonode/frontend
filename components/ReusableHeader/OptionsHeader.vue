/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="container-header">
        <div>
            <Select
                :value="selectedLanguageCards"
                :options="languagesValues"
                solid
                regular
                label="Translations"
                multiselect
                @input="onLanguageCardSelected" />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeysByValues, getValuesByKeys } from '~/model/objectWrapper';
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'OptionsHeader',
    components: {
        Select,
    },
    props: {
        cardsLanguageCodes: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapState('data', {
            languages: state => state.languages,
        }),
        languagesValues() {
            return Object.values(this.languages);
        },
        selectedLanguageCards() {
            const languageNames = getValuesByKeys(this.languages, this.cardsLanguageCodes);

            return this.languagesValues.filter(
                language => languageNames.some(
                    name => name === language,
                ),
            );
        },
    },
    methods: {
        ...mapActions('translations', [
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
    .container-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 34px;
        border-bottom: 1px solid $grey;
    }
</style>
