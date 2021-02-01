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
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Select
                    :value="type"
                    required
                    label="Profile type"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :options="sourcesOptions"
                    :error-messages="errors[typeFieldKey]"
                    @input="setTypeValue">
                    <template #append>
                        <FadeTransition>
                            <IconSpinner
                                v-if="isFetchingConfiguration"
                                :color="graphiteColor" />
                        </FadeTransition>
                    </template>
                </Select>
                <FadeTransition>
                    <JSONSchemaForm
                        v-if="schema"
                        :value="configuration"
                        :schema="schema"
                        :errors="errors"
                        @input="setConfigurationValue" />
                </FadeTransition>
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
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Import/config/privileges';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import JSONSchemaForm from '@UI/components/Form/JSONSchemaForm/JSONSchemaForm';
import FormSection from '@UI/components/Form/Section/FormSection';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import Select from '@UI/components/Select/Select';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ImportProfileForm',
    components: {
        Divider,
        IconSpinner,
        JSONSchemaForm,
        Form,
        FormSection,
        Select,
        FadeTransition,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    data() {
        return {
            schemas: {},
            isFetchingConfiguration: false,
        };
    },
    computed: {
        ...mapState('import', [
            'id',
            'type',
            'configuration',
        ]),
        ...mapState('dictionaries', [
            'sources',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Import/components/Forms/ImportProfileForm',
                type: this.type,
            });
        },
        graphiteColor() {
            return GRAPHITE;
        },
        schema() {
            if (!this.type) {
                return null;
            }

            return this.schemas[this.type];
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.create,
            ]));
        },
        isDisabled() {
            return Boolean(this.id);
        },
        sourcesOptions() {
            return Object.values(this.sources);
        },
        typeFieldKey() {
            return 'type';
        },
    },
    created() {
        if (this.type) {
            this.setSchema(this.type);
        }
    },
    methods: {
        ...mapActions('import', [
            '__setState',
            'getConfiguration',
        ]),
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
        async setSchema(type) {
            this.isFetchingConfiguration = true;

            await this.getConfiguration({
                onSuccess: (({
                    configuration,
                }) => {
                    this.schemas = {
                        ...this.schemas,
                        [type]: configuration,
                    };

                    this.isFetchingConfiguration = false;
                }),
            });
        },
        setConfigurationValue(value) {
            this.__setState({
                key: 'configuration',
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'configuration',
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
                value,
            });

            if (!this.schemas[value]) {
                this.setSchema(value);
            }
        },
    },
};
</script>
