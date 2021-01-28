/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <OptionKeyValues
        key="attrHasOptions"
        :errors="errors"
        :disabled="!isAllowedToUpdate" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import OptionKeyValues from '@Attributes/extends/attribute/components/Forms/Sections/OptionKeyValues';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'FormOptions',
    components: {
        OptionKeyValues,
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
