/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <Select
            :value="selectedLanguageNames"
            :options="languageNames"
            solid
            label="Languages"
            regular
            multiselect
            clearable
            @input="setSelectedLanguages" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'LanguageSettingsCard',
    components: {
        BaseCard,
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: state => state.languages,
            selectedLanguageNames: state => state.selectedLanguageNames,
        }),
        languageNames() {
            return this.$store.state.languageSettings.languages.map(language => language.name);
        },
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
        ]),
    },
};
</script>
