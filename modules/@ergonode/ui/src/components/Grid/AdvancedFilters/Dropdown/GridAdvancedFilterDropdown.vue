/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <Dropdown
            v-show="isVisible"
            :offset="offset"
            @click-outside="onClickOutside">
            <slot />
        </Dropdown>
    </FadeTransition>
</template>

<script>
import Dropdown from '@UI/components/Select/Dropdown/Dropdown';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'GridAdvancedFilterDropdown',
    components: {
        FadeTransition,
        Dropdown,
    },
    props: {
        /**
         * Determines position where component will be anchored
         */
        offset: {
            type: Object,
            required: true,
        },
        /**
         * Determines visibility of component
         */
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClickOutside(payload) {
            this.$emit('click-outside', payload);
        },
    },
};
</script>
