/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RolesAutocomplete
        :data-cy="dataCyGenerator(roleFieldKey)"
        :value="role"
        :required="true"
        :disabled="disabled"
        :error-messages="errors[roleIdFieldKey]"
        @input="setRoleValue" />
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import RolesAutocomplete from '@Roles/components/Autocompletes/RolesAutocomplete';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserFormRole',
    components: {
        RolesAutocomplete,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('user', [
            'role',
        ]),
        roleIdFieldKey() {
            return 'roleId';
        },
        roleFieldKey() {
            return 'role';
        },
    },
    methods: {
        ...mapActions('user', [
            '__setState',
        ]),
        setRoleValue(value) {
            this.__setState({
                key: this.roleFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.roleFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `user-${key}`;
        },
    },
};
</script>
