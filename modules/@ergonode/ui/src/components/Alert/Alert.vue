/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <Component
            :is="feedbackIconComponent"
            :fill-color="feedbackIconFillColor" />
        <span
            class="alert__title"
            v-text="message" />
        <Fab
            :theme="secondaryPlainTheme"
            @click.native="onRemoveAlert">
            <template #icon="{ color }">
                <IconClose :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    BLUE,
    GREEN,
    RED,
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';

/**
 * `Alert` is a default feedback component for user on http response.
 * Alerts are going to be displayed as default `FlashMessages`.
 */
export default {
    name: 'Alert',
    props: {
        /**
         * The unique ID
         */
        id: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Determines style of component based on type
         */
        type: {
            type: String,
            default: ALERT_TYPE.SUCCESS,
            validator: value => Object.values(ALERT_TYPE).indexOf(value) !== -1,
        },
        /**
         * The message
         * @values small, regular
         */
        message: {
            type: String,
            default: '',
        },
    },
    computed: {
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        classes() {
            return [
                'alert',
                `alert--${this.type}`,
            ];
        },
        capitalizedAlertType() {
            return toCapitalize(this.type);
        },
        feedbackIconComponent() {
            return () => import(`@UI/components/Icons/Feedback/Icon${this.capitalizedAlertType}`);
        },
        feedbackIconFillColor() {
            switch (this.type) {
            case ALERT_TYPE.SUCCESS:
                return GREEN;
            case ALERT_TYPE.ERROR:
                return RED;
            case ALERT_TYPE.WARNING:
                return YELLOW;
            default: return BLUE;
            }
        },
    },
    methods: {
        onRemoveAlert() {
            this.$emit('remove', {
                id: this.id,
            });
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
        background-color: $WHITE;
        color: $GRAPHITE_DARK;

        &__title {
            margin-left: 16px;
            flex: 1;
            word-break: break-word;
            font: $FONT_MEDIUM_14_20;
        }

        &--error {
            border: $BORDER_2_RED;
        }

        &--warning {
            border: $BORDER_2_YELLOW;
        }

        &--info {
            border: $BORDER_2_BLUE;
        }

        &--success {
            border: $BORDER_2_GREEN;
        }
    }
</style>
