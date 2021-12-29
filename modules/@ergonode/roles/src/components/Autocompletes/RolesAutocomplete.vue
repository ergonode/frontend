/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Autocomplete
        :data-cy="dataCy"
        :value="value"
        :required="required"
        :searchable="true"
        :wrap-value="true"
        :multiselect="multiselect"
        :clearable="clearable"
        :label="$t('@Roles.role.components.RolesAutocomplete.roleLabel')"
        :custom-fetch-event="roleCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        option-key="id"
        option-value="label"
        href="roles/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateRoleButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateRoleButton from '@Roles/components/Buttons/CreateRoleButton';
import {
    ROLE_CREATED_EVENT_NAME,
} from '@Roles/defaults';

export default {
    name: 'RolesAutocomplete',
    components: {
        CreateRoleButton,
    },
    props: {
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        multiselect: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        dataCy: {
            type: String,
            default: '',
        },
    },
    computed: {
        roleCreatedEventName() {
            return ROLE_CREATED_EVENT_NAME;
        },
        noDataPlaceholder() {
            return {
                title: this.$t('@Roles.role._.noRoles'),
                subtitle: this.$t('@Roles.role._.createFirst'),
            };
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
    },
};
</script>
