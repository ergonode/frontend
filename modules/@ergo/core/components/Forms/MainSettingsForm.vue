/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup title="General options">
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
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'MainSettingsForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: state => state.languages,
            selectedLanguages: state => state.selectedLanguages,
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
