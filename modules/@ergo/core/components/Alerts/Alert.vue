/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['alert', typeClass]">
        <Component :is="feedbackIconComponent" />
        <span
            class="alert__title"
            v-text="alert.message" />
        <Fab
            :theme="secondaryTheme"
            @click.native="removeAlert(alert)">
            <template #icon="{ fillColor }">
                <IconClose :fill-color="fillColor" />
            </template>
        </Fab>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { toCapitalize } from '@Core/models/stringWrapper';
import Fab from '@Core/components/Buttons/Fab';
import IconClose from '@Core/components/Icons/Window/IconClose';

export default {
    name: 'Alert',
    components: {
        Fab,
        IconClose,
    },
    props: {
        alert: {
            type: Object,
            required: true,
            validator: value => Object.values(ALERT_TYPE).indexOf(value.type) !== -1,
        },
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        typeClass() {
            return `alert--${this.alert.type}`;
        },
        capitalizedAlertType() {
            return toCapitalize(this.alert.type);
        },
        feedbackIconComponent() {
            return () => import(`@Core/components/Icons/Feedback/Icon${this.capitalizedAlertType}`);
        },
    },
    methods: {
        ...mapActions('alerts', [
            'removeAlert',
        ]),
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
