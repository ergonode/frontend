/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="card">
        <section v-if="title">
            <h2
                class="card__header"
                v-text="title" />
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
            padding: 16px 24px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_24_32;
            border-bottom: $BORDER_1_GREY;
        }

        &__body {
            padding: 24px;
        }
    }
</style>
