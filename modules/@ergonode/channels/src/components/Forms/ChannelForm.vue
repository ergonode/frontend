/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[typeFieldKey, nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    label="Channel name"
                    hint="System name must be unique"
                    @input="setNameValue" />
                <Select
                    :value="type"
                    required
                    label="Channel type"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :options="channelsOptions"
                    :error-messages="errorMessages[typeFieldKey]"
                    @input="setTypeValue" />
                <FadeTransition>
                    <JSONSchemaForm
                        v-if="schema"
                        :value="configuration"
                        :schema="schema"
                        @input="setConfigurationValue" />
                </FadeTransition>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import Form from '@Core/components/Form/Form';
import JSONSchemaForm from '@Core/components/Form/JSONSchemaForm/JSONSchemaForm';
import FormSection from '@Core/components/Form/Section/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
import TextField from '@Core/components/Inputs/TextField';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    getKeyByValue,
    removeFromObjectByKey,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ChannelForm',
    components: {
        Form,
        JSONSchemaForm,
        FormSection,
        TextField,
        FadeTransition,
        Select,
    },
    data() {
        return {
            schema: null,
        };
    },
    computed: {
        ...mapState('channels', {
            id: state => state.id,
            name: state => state.name,
            type: state => state.type,
            configuration: state => state.configuration,
        }),
        ...mapState('dictionaries', {
            channels: state => state.channels,
        }),
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        channelsOptions() {
            return Object.values(this.channels);
        },
        typeFieldKey() {
            return 'type';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    watch: {
        type: {
            immediate: true,
            async handler(value) {
                if (value) {
                    const typeId = getKeyByValue(this.channels, value);
                    const tmpSchema = await this.getConfigurationByType({
                        typeId,
                    });

                    this.schema = {
                        ...tmpSchema,
                        properties: removeFromObjectByKey(tmpSchema.properties, 'name'),
                    };
                }
            },
        },
    },
    methods: {
        ...mapActions('channels', [
            '__setState',
            'getConfigurationByType',
        ]),
        setNameValue(value) {
            this.__setState({
                key: 'name',
                value,
            });
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
        },
    },
};
</script>
