/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropDown
            v-show="isVisible"
            :offset="offset"
            @click-outside="onClickOutside">
            <template #body>
                <slot name="body" />
            </template>
            <template #footer>
                <slot name="footer" />
            </template>
        </DropDown>
    </FadeTransition>
</template>

<script>
import DropDown from '@UI/components/Select/DropDown/DropDown';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'GridAdvancedFilterDropDown',
    components: {
        FadeTransition,
        DropDown,
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
