/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    required
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    label="File name"
                    @input="setNameValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextField from '@Core/components/Inputs/TextField';
import PRIVILEGES from '@Media/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceForm',
    components: {
        Form,
        FormSection,
        TextField,
    },
    computed: {
        ...mapState('media', {
            name: state => state.name,
        }),
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('media', [
            '__setState',
        ]),
        setNameValue(value) {
            this.__setState({
                key: 'name',
                value,
            });
        },
    },
};
</script>
