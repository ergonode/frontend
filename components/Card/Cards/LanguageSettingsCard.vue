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
        <TextArea
            v-model="value"
            solid
            required
            label="Role description"
            :style="{height: '150px'}"
            hint="dupa" />
        <TextField
            v-model="value"
            solid
            regular
            required
            label="Role description"
            resize="none"
            hint="dupa" />
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
        TextArea: () => import('~/components/Inputs/TextArea'),
        TextField: () => import('~/components/Inputs/TextField'),
    },
    data() {
        return {
            value: '',
        };
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: (state) => state.languages,
            selectedLanguageNames: (state) => state.selectedLanguageNames,
        }),
        languageNames() {
            return this.$store.state.languageSettings.languages.map((language) => language.name);
        },
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
        ]),
    },
};
</script>
