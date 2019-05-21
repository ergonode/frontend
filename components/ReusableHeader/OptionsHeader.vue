/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="container-header">
        <div>
            <Select
                v-model="selectedTranslationCardLanguages"
                :options="languagesValues"
                solid
                regular
                label="Translations"
                :dismissible="false"
                multiselect />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getKeysByValues, getValuesByKeys } from '~/model/objectWrapper';

export default {
    name: 'OptionsHeader',
    components: {
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    props: {
        cardsLanguageCodes: {
            type: Array,
            required: true,
        },
        translations: {
            type: Object,
            required: true,
        },
        defaultTranslation: {
            type: Object,
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
        selectedTranslationCardLanguages: {
            get() {
                const languageNames = getValuesByKeys(this.languages, this.cardsLanguageCodes);

                return this.languagesValues.filter(
                    language => languageNames.some(
                        name => name === language,
                    ),
                );
            },
            set(newCardTranslations) {
                const languageCodes = getKeysByValues(this.languages, newCardTranslations);

                this.setTabVisibleCardTranslations({
                    languages: languageCodes,
                    defaultTranslation: this.defaultTranslation,
                });
            },
        },
    },
    methods: {
        ...mapActions('translations', [
            'setTabVisibleCardTranslations',
        ]),
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
