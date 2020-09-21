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
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Form from '@Core/components/Form/Form';
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm/JSONSchemaForm';
import FormSection from '@Core/components/Form/Section/FormSection';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import Select from '@Core/components/Inputs/Select/Select';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Import/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ImportProfileForm',
    components: {
        IconSpinner,
        JSONSchemaForm,
        Form,
        FormSection,
        Select,
        FadeTransition,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
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
            ]);
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
        async setSchema(type) {
            this.isFetchingConfiguration = true;

            this.schemas = {
                ...this.schemas,
                [type]: await this.getConfiguration(),
            };

            this.isFetchingConfiguration = false;
        },
        setConfigurationValue(value) {
            this.__setState({
                key: 'configuration',
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: 'type',
                value,
            });

            if (!this.schemas[value]) {
                this.setSchema(value);
            }
        },
    },
};
</script>
