/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup title="Status change">
            <TranslationSelect
                :value="source"
                :solid="true"
                :regular="true"
                :required="true"
                label="From"
                :options="sourceOptions"
                :disabled="isDisabled || isDisabledByPrivileges"
                :error-messages="errorSourceMessage"
                @input="setSource" />
            <TranslationSelect
                :value="destination"
                :solid="true"
                :regular="true"
                :required="true"
                label="To"
                :options="destinationOptions"
                :disabled="isDisabled || isDisabledByPrivileges"
                :error-messages="errorDestinationMessage"
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
                :error-messages="errorRoleMessage"
                @input="setRoles" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isEmpty } from '@Core/models/objectWrapper';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

export default {
    name: 'TransitionForm',
    components: {
        TranslationSelect,
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    mixins: [errorValidationMixin],
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
            return this.statuses.filter(status => status.id !== this.destination.id);
        },
        destinationOptions() {
            return this.statuses.filter(status => status.id !== this.source.id);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['WORKFLOW_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['WORKFLOW_CREATE']));
        },
        errorSourceMessage() {
            const sourceIndex = 'source';
            return this.elementIsValidate(sourceIndex);
        },
        errorDestinationMessage() {
            const destinationIndex = 'destination';
            return this.elementIsValidate(destinationIndex);
        },
        errorRoleMessage() {
            const roleIndex = 'roleId';
            return this.elementIsValidate(roleIndex);
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
