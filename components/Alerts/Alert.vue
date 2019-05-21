/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['alert', typeClass]">
        <Icon
            :icon="feedbackIcon"
            size="medium" />
        <span
            class="alert__title typo-subtitle txt--dark-graphite txt-fixed"
            v-text="message" />
        <Button
            fab
            color="transparent"
            ripple-color="rgba(235, 235, 236, 1)"
            icon="window-close"
            @click.native="onDismiss" />
    </div>
</template>

<script>
import Button from '~/components/Buttons/Button';
import Icon from '~/components/Icon/Icon';

export default {
    name: 'Alert',
    components: {
        Button,
        Icon,
    },
    props: {
        type: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        typeClass() {
            return `alert--${this.type}`;
        },
        feedbackIcon() {
            return `sprite-feedback feedback-${this.type}`;
        },
    },
    methods: {
        onDismiss() {
            this.$emit('dismiss');
        },
    },
};
</script>

<style lang="scss" scoped>
    .alert {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        padding: 18px;
        background-color: $white;

        &__title {
            margin-left: 16px;
            flex: 1;
        }

        &--error {
            border: solid 2px $error;
        }

        &--warning {
            border: solid 2px $warning;
        }

        &--information {
            border: solid 2px $information;
        }

        &--success {
            border: solid 2px $success;
        }
    }
</style>
