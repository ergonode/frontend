/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="modal">
        <section v-if="title">
            <h2
                class="modal__header"
                v-text="title" />
        </section>
        <section>
            <slot />
        </section>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal {
        display: flex;
        flex-direction: column;
        box-shadow: $ELEVATOR_2_DP;

        &__header {
            padding: 16px 24px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_24_32;
            border-bottom: $BORDER_1_GREY;
        }
    }
</style>
