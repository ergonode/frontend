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
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);

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
