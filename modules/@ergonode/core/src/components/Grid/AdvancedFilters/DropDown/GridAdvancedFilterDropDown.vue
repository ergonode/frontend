/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropDown
            v-show="isVisible"
            :offset="offset"
            @clickOutside="onClickOutside">
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
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import FadeTransition from '@Core/components/Transitions/FadeTransition';

export default {
    name: 'GridAdvancedFilterDropDown',
    components: {
        FadeTransition,
        DropDown,
    },
    props: {
        offset: {
            type: Object,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClickOutside(payload) {
            this.$emit('clickOutside', payload);
        },
    },
};
</script>
