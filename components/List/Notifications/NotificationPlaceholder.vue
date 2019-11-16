/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['notifications-placeholder', layoutOrientation]">
        <div class="notifications-placeholder__description">
            <span class="notifications-placeholder__title">
                Nothing to see here
            </span>
            <span class="notifications-placeholder__subtitle">
                This is where you will see important notifications for product updates
            </span>
        </div>
    </div>
</template>

<script>
import { LayoutOrientation } from '~/defaults/layout';

export default {
    name: 'NotificationPlaceholder',
    props: {
        layoutOrientation: {
            type: String,
            default: LayoutOrientation.VERTICAL,
            validator: (value) => Object.values(LayoutOrientation).indexOf(value) !== -1,
        },
    },
};
</script>

<style lang="scss" scoped>
    .notifications-placeholder {
        flex: 1;
        box-sizing: border-box;
        background: url("~assets/images/placeholders/notify.svg") no-repeat right bottom;
        color: $GRAPHITE_DARK;

        &.vertical-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 64px 0 0;
        }

        &.horizontal-layout {
            height: 280px;
            padding: 40px 40px 0;
            box-sizing: border-box;
            box-shadow: $ELEVATOR_2_DP;
        }

        &__title {
            font: $FONT_MEDIUM_24_32;
        }

        &__subtitle {
            font: $FONT_MEDIUM_12_16;
        }

        &__description {
            display: grid;
            grid-template-columns: 240px;
            grid-auto-flow: row;
            row-gap: 8px;
        }
    }
</style>
