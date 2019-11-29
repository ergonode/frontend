/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['alert', typeClass]">
        <Component :is="feedbackIconComponent" />
        <span
            class="alert__title font--medium-14-20"
            v-text="alert.message" />
        <FabButton
            :theme="secondaryTheme"
            :plain="true"
            @click.native="() => removeAlert(alert)">
            <template #icon="{ color }">
                <IconClose :fill-color="color" />
            </template>
        </FabButton>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { THEMES } from '~/defaults/buttons';
import { toCapitalize } from '~/model/stringWrapper';
import FabButton from '~/core/components/Buttons/FabButton';
import IconClose from '~/components/Icon/Window/IconClose';

export default {
    name: 'Alert',
    components: {
        FabButton,
        IconClose,
    },
    props: {
        alert: {
            type: Object,
            required: true,
            validator: (value) => ['success', 'info', 'warning', 'error'].indexOf(value.type) !== -1,
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
            return () => import(`~/components/Icon/Feedback/Icon${this.capitalizedAlertType}`);
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
