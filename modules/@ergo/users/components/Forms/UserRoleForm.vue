/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[descriptionFieldKey, nameFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="name"
                    solid
                    required
                    regular
                    label="Role name"
                    :error-messages="errorMessages[nameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="setName" />
                <TextArea
                    :value="description"
                    solid
                    required
                    label="Role description"
                    resize="none"
                    :style="{height: '150px'}"
                    :error-messages="errorMessages[descriptionFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="setDescription" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'UserRoleForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        TextArea: () => import('@Core/components/Inputs/TextArea'),
    },
    computed: {
        ...mapState('roles', {
            roleID: state => state.id,
            name: state => state.name,
            description: state => state.description,
        }),
        isDisabled() {
            return Boolean(this.roleID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['USER_ROLE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['USER_ROLE_CREATE']));
        },
        descriptionFieldKey() {
            return 'description';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('roles', [
            'setName',
            'setDescription',
        ]),
    },
};
</script>
