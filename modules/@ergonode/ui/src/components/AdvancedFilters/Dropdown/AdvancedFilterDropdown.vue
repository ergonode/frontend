/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Dropdown
        :visible="visible"
        :fixed="fixed"
        :parent-reference="parentReference"
        @click-outside="onClickOutside">
        <slot />
    </Dropdown>
</template>

<script>

export default {
    name: 'AdvancedFilterDropdown',
    props: {
        /**
         * Determines visibility of component
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines whether content of dropdown has fixed height and width or not
         */
        fixed: {
            type: Boolean,
            default: false,
        },
        /**
         * The vue component reference to which dropdown is hooked
         */
        // eslint-disable-next-line vue/require-prop-types
        parentReference: {
            required: true,
        },
    },
    methods: {
        onClickOutside(payload) {
            this.$emit('click-outside', payload);
        },
    },
};
</script>
