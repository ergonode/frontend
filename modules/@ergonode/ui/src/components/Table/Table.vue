/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

export default {
    name: 'Table',
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
        border: $BORDER_1_GREY;

        &__body {
            background-color: $WHITESMOKE;
        }
    }
</style>
