/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <TranslationSelect
                :value="selectedLanguages"
                :options="languages"
                :solid="true"
                label="Languages"
                :regular="true"
                :multiselect="true"
                :clearable="true"
                :searchable="true"
                :drop-down-height="400"
                @input="setSelectedLanguages"
                @search="getFilteredData" />
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
        TranslationSelect: () => import('~/core/components/Inputs/Select/TranslationSelect'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: (state) => state.languages,
            selectedLanguages: (state) => state.selectedLanguages,
        }),
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
            'getFilteredData',
        ]),
    },
};
</script>
