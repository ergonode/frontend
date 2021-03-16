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
        :multiselect="multiselect"
        :clearable="clearable"
        :label="$t('user.form.roleLabel')"
        :custom-fetch-event="roleCreatedEventName"
        :error-messages="errorMessages"
        :disabled="disabled"
        href="roles/autocomplete"
        @input="onValueChange">
        <template #noDataPlaceholder>
            <SelectListNoDataPlaceholder
                :title="noDataPlaceholder.title"
                :subtitle="noDataPlaceholder.subtitle">
                <template #action>
                    <CreateProductTemplateButton />
                </template>
            </SelectListNoDataPlaceholder>
        </template>
    </Autocomplete>
</template>

<script>
import CreateProductTemplateButton from '@Templates/components/Buttons/CreateProductTemplateButton';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';
import {
    ROLE_CREATED_EVENT_NAME,
} from '@Users/defaults';

export default {
    name: 'RolesAutocomplete',
    components: {
        CreateProductTemplateButton,
        SelectListNoDataPlaceholder,
        Autocomplete,
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
                title: this.$t('user.form.noRoleTitle'),
                subtitle: this.$t('user.form.noRoleSubtitle'),
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
