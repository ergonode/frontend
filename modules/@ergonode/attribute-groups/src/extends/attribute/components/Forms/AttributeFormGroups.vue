/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeGroupsAutocomplete
        :data-cy="dataCy"
        :value="groups"
        :multiselect="true"
        :clearable="true"
        :disabled="disabled"
        :error-messages="errors[groupsFieldKey]"
        @input="onGroupsValueChange" />
</template>

<script>
import AttributeGroupsAutocomplete from '@AttributeGroups/components/Autocompletes/AttributeGroupsAutocomplete';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormGroups',
    components: {
        AttributeGroupsAutocomplete,
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
        ...mapState('attribute', [
            'groups',
        ]),
        dataCy() {
            return `attribute-${this.groupsFieldKey}`;
        },
        groupsFieldKey() {
            return 'groups';
        },
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        onGroupsValueChange(value) {
            this.__setState({
                key: this.groupsFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.groupsFieldKey,
                value,
            });
        },
    },
};
</script>
