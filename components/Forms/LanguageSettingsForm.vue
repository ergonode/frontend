/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <Select
                :value="selectedLanguageNames"
                :options="languageOptions"
                solid
                label="Languages"
                regular
                multiselect
                clearable
                searchable
                :drop-down-height="400"
                @input="setSelectedLanguages"
                @search="onSearch" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'LanguageSettingsForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: (state) => state.languages,
            selectedLanguageNames: (state) => state.selectedLanguageNames,
        }),
        languageOptions() {
            return this.languages.map((language) => ({
                id: language.code,
                name: language.name,
            }));
        },
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
            'getFilteredData',
        ]),
        onSearch(filter) {
            this.getFilteredData(filter);
        },
    },
};
</script>
