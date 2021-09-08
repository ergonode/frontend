/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import Dropdown from '@UI/components/Select/Dropdown/Dropdown';

export default {
    name: 'AdvancedFilterDropdown',
    components: {
        Dropdown,
    },
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
