/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup title="Status change">
            <Select
                :value="source"
                solid
                regular
                required
                label="From"
                :options="statuses"
                :disabled="isDisabled || isDisabledByPrivileges"
                :error-messages="errorSourceMessage"
                @input="onSetSource" />
            <Select
                :value="destination"
                solid
                regular
                required
                label="To"
                :options="statuses"
                :disabled="isDisabled || isDisabledByPrivileges"
                :error-messages="errorDestinationMessage"
                @input="onSetDestination" />
        </FormGroup>
        <FormGroup title="Actions">
            <Select
                :value="transitionRoles"
                solid
                regular
                clearable
                multiselect
                label="Role"
                :options="roles"
                :disabled="isDisabledByPrivileges"
                :error-messages="errorRoleMessage"
                @input="onSetRoles" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isEmpty } from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'TransitionForm',
    components: {
        Form: () => import('~/core/components/Form/Form'),
        FormGroup: () => import('~/core/components/Form/FormGroup'),
        Select: () => import('~/core/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('transitions', {
            source: (state) => state.source,
            destination: (state) => state.destination,
            transitionRoles: (state) => state.roles,
        }),
        ...mapState('productStatus', {
            statuses: (state) => state.statuses,
        }),
        ...mapState('roles', {
            roles: (state) => state.roles,
        }),
        isDisabled() {
            if (!isEmpty(this.$route.params)) {
                const { id } = this.$route.params;
                const [source, destination] = id.split('--');

                return Boolean(source) && Boolean(destination);
            }
            return false;
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
        ...mapActions('validations', [
            'setErrorForKey',
        ]),
        onSetSource(source) {
            let value = source;
            if (source === this.destination) {
                value = null;
                this.setErrorForKey({ key: 'source', error: ['Source must be different then destination'] });
            }
            this.setSource(value);
        },
        onSetDestination(destination) {
            let value = destination;
            if (destination === this.source) {
                value = null;
                this.setErrorForKey({ key: 'destination', error: ['Destination must be different then source'] });
            }
            this.setDestination(value);
        },
        onSetRoles(roles) {
            this.setRoles(roles);
        },
    },
};
</script>
