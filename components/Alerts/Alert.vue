/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['alert', typeClass]">
        <Component :is="feedbackIconComponent" />
        <span
            class="alert__title typo-subtitle txt--dark-graphite txt-fixed"
            v-text="message" />
        <Button
            fab
            color="transparent"
            ripple-color="rgba(235, 235, 236, 1)"
            @click.native="onDismiss">
            <template v-slot:prepend>
                <IconClose />
            </template>
        </Button>
    </div>
</template>

<script>
import { toCapitalize } from '~/model/stringWrapper';
import Button from '~/components/Buttons/Button';
import IconClose from '~/components/Icon/Window/IconClose';

export default {
    name: 'Alert',
    components: {
        Button,
        IconClose,
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
        feedbackIconComponent() {
            const capitalizedType = toCapitalize(this.type);
            return () => import(`~/components/Icon/Feedback/Icon${capitalizedType}`);
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
        padding: 10px 18px;
        margin: 2px 0;
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

        &--info {
            border: solid 2px $information;
        }

        &--success {
            border: solid 2px $success;
        }
    }
</style>
