/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <table class="table">
        <thead v-if="isHeadSlot">
            <slot name="head" />
        </thead>
        <tbody class="table__body">
            <Preloader v-if="isPrefetchingData" />
            <slot
                v-else
                name="body" />
        </tbody>
    </table>
</template>

<script>
import Preloader from '@UI/components/Preloader/Preloader';

export default {
    name: 'Table',
    components: {
        Preloader,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Determines if data is loaded asynchronously
         */
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isHeadSlot() {
            return !!this.$slots.head;
        },
    },
};
</script>

<style lang="scss" scoped>
    .table {
        border: 1px solid $GREY;

        &__body {
            background-color: $WHITESMOKE;
        }
    }
</style>
