/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionKeyValues
        key="attrHasOptions"
        :errors="errors"
        :disabled="!isAllowedToUpdate" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import AttributeOptionKeyValues from '@Attributes/extends/attribute/components/Forms/Sections/AttributeOptionKeyValues';
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
        errors: {
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
