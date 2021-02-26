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
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmitForm">
        <template #body>
            <FormSection>
                <LanguagesAutocomplete
                    :value="activeLanguages"
                    :multiselect="true"
                    :clearable="true"
                    :disabled="!isAllowedToUpdate"
                    @input="setSelectedLanguages" />
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
import LanguagesAutocomplete from '@Core/components/Autocompletes/LanguagesAutocomplete';
import PRIVILEGES from '@Core/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import {
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsForm',
    components: {
        LanguagesAutocomplete,
        Divider,
        Form,
        FormSection,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    data() {
        return {
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
                id,
            }) => id);
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
        setSelectedLanguages(value) {
            this.activeLanguages = value;

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.languagesFieldKey,
                value,
            });
        },
        onSubmitForm() {
            this.$emit('submit', this.activeLanguages);
        },
    },
};
</script>
