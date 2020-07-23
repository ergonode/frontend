/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="widget">
        <section class="widget__header">
            <h2
                class="widget__title"
                v-text="title" />
            <slot name="appendHeader" />
        </section>
        <section class="widget__body">
            <slot name="body" />
        </section>
    </div>
</template>

<script>
export default {
    name: 'Widget',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .widget {
        display: flex;
        flex-direction: column;
        padding: 40px;
        background-color: $GRAPHITE_DARK;
        box-shadow: $ELEVATOR_2_DP;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__title {
            color: $WHITE;
            font: $FONT_SEMI_BOLD_24_32;
        }

        &__body {
            margin-top: 40px;
        }
    }
</style>
