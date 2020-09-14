/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[descriptionFieldKey, nameFieldKey]">
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
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserRoleForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TextArea: () => import('@Core/components/Inputs/TextArea'),
    },
    computed: {
        ...mapState('role', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
        }),
        isDisabled() {
            return Boolean(this.roleID);
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
