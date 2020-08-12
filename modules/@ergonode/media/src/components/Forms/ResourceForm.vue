/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[fileNameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="fileName"
                    required
                    :error-messages="errorMessages[fileNameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    label="File name"
                    @input="setFileNameValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
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
        Select,
    },
    computed: {
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]);
        },
        fileNameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('media', [
            '__setState',
        ]),
        setFileNameValue(value) {
            this.__setState({
                key: 'fileName',
                value,
            });
        },
    },
};
</script>
