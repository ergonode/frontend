/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributeOptionKeyValues
        key="attrHasOptions"
        :disabled="!isAllowedToUpdate" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormOptions',
    components: {
        AttributeOptionKeyValues: () => import('@Attributes/components/Forms/Sections/AttributeOptionKeyValues'),
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
    created() {
        this.$emit('fieldKeys', [
            ...this.optionsFieldKeys,
        ]);
    },
    methods: {
        ...mapActions('attribute', [
            'removeAttributeOptions',
        ]),
    },
};
</script>
