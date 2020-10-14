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
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmitForm">
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
                <Divider v-if="extendedForm.length" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import InfoHint from '@Core/components/Hints/InfoHint';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import PRIVILEGES from '@Core/config/privileges';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
        Divider,
        InfoHint,
        Form,
        FormSection,
        TranslationSelect,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    data() {
        return {
            filteredValue: '',
            activeLanguages: [],
        };
    },
    computed: {
        ...mapState('core', [
            'languages',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Core/components/Forms/MainSettingsForm',
            });
        },
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
        languagesFieldKey() {
            return 'langauges';
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
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        setSelectedLanguages(selectedLanguages) {
            this.activeLanguages = selectedLanguages;

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.languagesFieldKey,
                value: selectedLanguages,
            });
        },
        onSubmitForm() {
            this.$emit('submit', this.activeLanguages);
        },
        onSearch(value) {
            this.filteredValue = value;
        },
    },
};
</script>
