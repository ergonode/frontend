/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Status change"
        :fields-keys="[roleFieldKey, destinationFieldKey, sourceFieldKey]">
        <template #body="{ errorMessages }">
            <FormGroup>
                <TranslationSelect
                    :value="source"
                    :solid="true"
                    :regular="true"
                    :required="true"
                    label="From"
                    :clearable="true"
                    :options="sourceOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[sourceFieldKey]"
                    @input="setSource" />
                <TranslationSelect
                    :value="destination"
                    :solid="true"
                    :regular="true"
                    :required="true"
                    label="To"
                    :clearable="true"
                    :options="destinationOptions"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :error-messages="errorMessages[destinationFieldKey]"
                    @input="setDestination" />
            </FormGroup>
            <Divider />
            <FormGroup title="Send notification to">
                <TranslationSelect
                    :value="transitionRoles"
                    :solid="true"
                    :regular="true"
                    :clearable="true"
                    :multiselect="true"
                    label="Role"
                    :options="roles"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[roleFieldKey]"
                    @input="setRoles" />
            </FormGroup>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isEmpty } from '@Core/models/objectWrapper';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'TransitionForm',
    components: {
        TranslationSelect,
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    computed: {
        ...mapState('transitions', {
            source: state => state.source,
            destination: state => state.destination,
            transitionRoles: state => state.roles,
        }),
        ...mapState('productStatus', {
            statuses: state => state.statuses,
        }),
        ...mapState('roles', {
            roles: state => state.roles,
        }),
        isDisabled() {
            if (!isEmpty(this.$route.params)) {
                const { id } = this.$route.params;
                const [source, destination] = id.split('--');

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
            return (this.isDisabled && !this.$hasAccess(['WORKFLOW_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['WORKFLOW_CREATE']));
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
            'setSource',
            'setDestination',
            'setRoles',
        ]),
    },
};
</script>
