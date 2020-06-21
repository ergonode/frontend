/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="General">
        <template #body>
            <FormSection>
                <TranslationSelect
                    :value="activeLanguages"
                    :options="languageOptions"
                    label="Languages"
                    :multiselect="true"
                    :clearable="true"
                    :searchable="true"
                    :description="hint"
                    :sticky-search="true"
                    @input="setSelectedLanguages"
                    @search="onSearch" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
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
        onSearch(value) {
            this.filteredValue = value;
        },
    },
};
</script>
