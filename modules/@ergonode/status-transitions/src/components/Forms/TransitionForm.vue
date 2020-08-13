/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Status change"
        :fields-keys="[roleFieldKey, destinationFieldKey, sourceFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TranslationSelect
                    :value="source"
                    :required="true"
                    label="From"
                    :clearable="true"
                    :options="sourceOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[sourceFieldKey]"
                    @input="setSourceValue" />
                <TranslationSelect
                    :value="destination"
                    :required="true"
                    label="To"
                    :clearable="true"
                    :options="destinationOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[destinationFieldKey]"
                    @input="setDestinationValue" />
            </FormSection>
            <Divider />
            <FormSection title="Send notification to">
                <TranslationLazySelect
                    :value="roles"
                    :clearable="true"
                    :multiselect="true"
                    label="Role"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[roleFieldKey]"
                    :fetch-options-request="getRolesOptionsRequest"
                    @input="setRolesValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import PRIVILEGES from '@Transitions/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

const getRolesOptions = () => import('@Users/services/getRolesOptions.service');

export default {
    name: 'TransitionForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        Divider: () => import('@Core/components/Dividers/Divider'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
    },
    computed: {
        ...mapState('transitions', {
            source: state => state.source,
            destination: state => state.destination,
            roles: state => state.roles,
        }),
        ...mapState('productStatus', {
            statuses: state => state.statuses,
        }),
        isDisabled() {
            if (!isEmpty(this.$route.params)) {
                const {
                    id,
                } = this.$route.params;
                const [
                    source,
                    destination,
                ] = id.split('--');

                return Boolean(source) && Boolean(destination);
            }
            return false;
        },
        sourceOptions() {
            return this.statuses.filter(status => !this.destination
                || status.id !== this.destination.id);
        },
        destinationOptions() {
            return this.statuses.filter(status => !this.source
                || status.id !== this.source.id);
        },
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        roleFieldKey() {
            return 'roleId';
        },
        destinationFieldKey() {
            return 'destination';
        },
        sourceFieldKey() {
            return 'source';
        },
    },
    methods: {
        ...mapActions('transitions', [
            '__setState',
        ]),
        setSourceValue(value) {
            this.__setState({
                key: 'source',
                value,
            });
        },
        setDestinationValue(value) {
            this.__setState({
                key: 'destination',
                value,
            });
        },
        setRolesValue(value) {
            this.__setState({
                key: 'roles',
                value,
            });
        },
        getRolesOptionsRequest() {
            return getRolesOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
    },
};
</script>
