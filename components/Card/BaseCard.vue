/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="cardClasses">
        <slot name="header" />
        <div class="base-card__content">
            <slot />
            <div class="modal-container">
                <slot name="modal" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseCard',
    props: {
        modal: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        cardClasses() {
            return [
                'base-card',
                { 'base-card--modal': this.modal },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .base-card {
        width: 280px;
        margin: 16px;

        &--modal {
            box-shadow: $ELEVATOR_2_DP;

            & > .card-header {
                padding: 16px 24px;
            }

            .modal-container {
                display: grid;
                grid-row-gap: 16px;
                margin: 0 24px 16px;
            }
        }

        &__content {
            display: grid;
            grid-gap: 16px;
        }
    }
</style>
