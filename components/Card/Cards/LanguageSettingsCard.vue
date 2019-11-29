/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <Select
                :value="selectedLanguageNames"
                :options="languageNames"
                solid
                label="Languages"
                regular
                multiselect
                clearable
                @input="setSelectedLanguages" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'LanguageSettingsCard',
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
