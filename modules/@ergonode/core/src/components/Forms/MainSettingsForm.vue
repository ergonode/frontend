/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
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
        <template #submit>
            <slot name="submitForm" />
        </template>
    </Form>
</template>

<script>
import InfoHint from '@Core/components/Hints/InfoHint';
import PRIVILEGES from '@Core/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
        InfoHint,
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
    data() {
        return {
            filteredValue: '',
            tmpLanguages: [],
            activeLanguages: [],
        };
    },
    computed: {
        ...mapState('core', {
            languages: state => state.languages,
        }),
        languageOptions() {
            if (this.filteredValue) {
                const rgx = new RegExp(this.filteredValue, 'i');

                return this.tmpLanguages.filter(
                    ({
                        key, value,
                    }) => key.match(rgx) || value.match(rgx),
                );
            }
            return this.tmpLanguages;
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
    watch: {
        languages: {
            deep: true,
            immediate: true,
            handler(value) {
                const mappedLanguage = ({
                    id, name, code,
                }) => ({
                    id,
                    key: code,
                    value: name,
                });

                this.tmpLanguages = value.map(mappedLanguage);
                this.activeLanguages = value
                    .filter(({
                        active,
                    }) => active === true)
                    .map(mappedLanguage);
                this.$emit('selectedLanguages', this.activeLanguages);
            },
        },
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
