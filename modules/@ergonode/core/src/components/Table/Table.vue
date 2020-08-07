/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="table">
        <slot name="title">
            <h2
                v-if="title"
                class="table__title"
                v-text="title" />
        </slot>
        <table
            v-if="isBodySlot || isHeadSlot"
            class="table__content">
            <thead v-if="isHeadSlot">
                <slot name="head" />
            </thead>
            <tbody v-if="isBodySlot">
                <slot name="body" />
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        isBodySlot() {
            return !!this.$slots.body;
        },
        isHeadSlot() {
            return !!this.$slots.head;
        },
    },
};
</script>

<style lang="scss" scoped>
    .table {
        display: grid;
        grid-template-columns: 352px;
        grid-auto-flow: row;
        grid-row-gap: 24px;
        margin-top: 24px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_16_24;
        }

        &__content {
            border: 1px solid $GREY;
        }
    }
</style>
