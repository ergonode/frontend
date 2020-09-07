/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TranslationSelect
                    v-model="activeLanguages"
                    :options="languageOptions"
                    label="Languages"
                    :multiselect="true"
                    :clearable="true"
                    :searchable="true"
                    :sticky-search="true"
                    :disabled="!isAllowedToUpdate"
                    @input="setSelectedLanguages"
                    @search="onSearch">
                    <template #append>
                        <InfoHint
                            v-if="hint"
                            :hint="hint" />
                    </template>
                </TranslationSelect>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import InfoHint from '@Core/components/Hints/InfoHint';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import PRIVILEGES from '@Core/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
        InfoHint,
        Form,
        FormSection,
        TranslationSelect,
    },
    props: {
        submitTitle: {
            type: String,
            default: '',
        },
        proceedTitle: {
            type: String,
            default: '',
        },
        isSubmitting: {
            type: Boolean,
            default: false,
        },
        isProceeding: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            filteredValue: '',
            activeLanguages: [],
        };
    },
    computed: {
        ...mapState('core', {
            languages: state => state.languages,
        }),
        mappedLanguages() {
            return this.languages.map(({
                id, name, code,
            }) => ({
                id,
                key: code,
                value: name,
            }));
        },
        languageOptions() {
            if (this.filteredValue) {
                const rgx = new RegExp(this.filteredValue, 'i');

                return this.mappedLanguages.filter(
                    ({
                        key, value,
                    }) => key.match(rgx) || value.match(rgx),
                );
            }
            return this.mappedLanguages;
        },
        hint() {
            return this.activeLanguages.map(({
                value,
            }) => value).join(', ');
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    created() {
        this.activeLanguages = this.languages
            .filter(({
                active,
            }) => active)
            .map(({
                id, name, code,
            }) => ({
                id,
                key: code,
                value: name,
            }));
    },
    methods: {
        setSelectedLanguages(selectedLanguages) {
            this.activeLanguages = selectedLanguages;
            this.$emit('selectedLanguages', selectedLanguages);
        },
        onSubmit() {
            this.$emit('submit', this.activeLanguages);
        },
        onSearch(value) {
            this.filteredValue = value;
        },
    },
};
</script>
