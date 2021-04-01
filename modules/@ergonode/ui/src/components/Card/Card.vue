/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="card">
        <section
            class="card__header"
            v-if="title">
            <h2
                class="card__title"
                v-text="title" />
            <slot name="appendHeader" />
        </section>
        <section class="card__body">
            <slot />
        </section>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .card {
        display: flex;
        flex-direction: column;
        box-shadow: $ELEVATOR_2_DP;

        &__header {
            display: flex;
            align-items: center;
            column-gap: 8px;
            padding: 16px 24px;
            border-bottom: $BORDER_1_GREY;
        }

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_24_32;
        }

        &__body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
        }
    }
</style>
