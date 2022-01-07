/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Import.import.components.ImportProfileForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        :errors-presentation-mapper="errorMapper"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Select
                    :value="type"
                    required
                    :label="$t('@Import.import.components.ImportProfileForm.typeLabel')"
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
                        :widgets="schemaWidgets"
                        :errors="errors"
                        :disabled="!isAllowedToUpdate"
                        @input="setConfigurationValue" />
                </FadeTransition>
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
import {
    getMappedPresentationErrors,
} from '@Core/models/mappers/errorsMapper';
import PRIVILEGES from '@Import/config/privileges';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ImportProfileForm',
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
        schemaWidgets() {
            return {
                dictionary: () => import('@UI/components/Form/JSONSchemaForm/Widget/JSONSchemaFormDictionaryWidget'),
            };
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
        errorMapper(errors) {
            return getMappedPresentationErrors(errors);
        },
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
