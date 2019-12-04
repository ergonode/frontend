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

            <Select
                :value="'xxx'"
                :options="[{code: 'xxx', name: 'name'}, {code: 'yyy', name: 'nam2'}]"
                solid
                label="new"
                regular
                searchable
                :drop-down-height="400"
                @input="getInput"
                @search="onSearch2" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'LanguageSettingsForm',
    components: {
        Form: () => import('~/core/components/Form/Form'),
        FormGroup: () => import('~/core/components/Form/FormGroup'),
        Select: () => import('~/core/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: (state) => state.languages,
            selectedLanguageNames: (state) => state.selectedLanguageNames,
        }),
        languageOptions() {
            return this.languages.map((language) => ({ code: language.code, name: language.name }));
        },
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
            'getData',
        ]),
        onSearch(filter) {
            this.getData(filter);
        },
        onSearch2(filter) {
            console.log(filter);
        },
        getInput(x) {
            console.log(x);
        },
    },
};
</script>
