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
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    required
                    label="Role name"
                    hint="Role name must be unique"
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setNameValue" />
                <TextArea
                    :value="description"
                    label="Role description"
                    resize="none"
                    height="150px"
                    :error-messages="errorMessages[descriptionFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setDescriptionValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import TextArea from '@Core/components/Inputs/TextArea';
import TextField from '@Core/components/Inputs/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserRoleForm',
    components: {
        Form,
        FormSection,
        TextField,
        TextArea,
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
    computed: {
        ...mapState('role', {
            id: state => state.id,
            name: state => state.name,
            description: state => state.description,
        }),
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]);
        },
        descriptionFieldKey() {
            return 'description';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('role', [
            '__setState',
        ]),
        onSubmit() {
            this.$emit('submit');
        },
        setNameValue(value) {
            this.__setState({
                key: 'name',
                value,
            });
        },
        setDescriptionValue(value) {
            this.__setState({
                key: 'description',
                value,
            });
        },
    },
};
</script>
