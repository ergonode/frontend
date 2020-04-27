/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[typeFieldKey, nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    solid
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    regular
                    label="System name"
                    hint="System name must be unique"
                    @input="setName" />
                <Select
                    :value="type"
                    solid
                    required
                    label="Profile type"
                    regular
                    :disabled="isDisabledByPrivileges"
                    :options="sourcesOptions"
                    :error-messages="errorMessages[typeFieldKey]"
                    @input="setType" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import Select from '@Core/components/Inputs/Select/Select';

export default {
    name: 'ImportProfileForm',
    components: {
        Form,
        FormSection,
        TextField,
        Select,
    },
    computed: {
        ...mapState('import', {
            id: state => state.id,
            name: state => state.name,
            type: state => state.type,
        }),
        ...mapState('dictionaries', {
            sources: state => state.sources,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['IMPORT_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['IMPORT_CREATE']));
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
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('import', [
            'setName',
            'setType',
        ]),
    },
};
</script>
