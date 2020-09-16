/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionKeyValues
        key="attrHasOptions"
        :error-messages="errorMessages"
        :disabled="!isAllowedToUpdate" />
</template>

<script>
import AttributeOptionKeyValues from '@Attributes/components/Forms/Sections/AttributeOptionKeyValues';
import PRIVILEGES from '@Attributes/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormOptions',
    components: {
        AttributeOptionKeyValues,
    },
    props: {
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
        typeKey: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('attribute', [
            'options',
        ]),
        optionsFieldKeys() {
            return 'options';
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
    },
    watch: {
        typeKey: {
            handler() {
                this.removeAttributeOptions();
            },
        },
    },
    methods: {
        ...mapActions('attribute', [
            'removeAttributeOptions',
        ]),
    },
};
</script>
