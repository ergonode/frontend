/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBadge :style="styles">
        <IconWarning
            :fill-color="yellowColor"
            :width="16"
            :height="16" />
    </RoundedBadge>
</template>

<script>

import {
    YELLOW,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NotificationWarningBadge',
    props: {
        floating: {
            type: Object,
            default: null,
        },
    },
    computed: {
        styles() {
            if (!this.floating) {
                return null;
            }

            return {
                position: 'absolute',
                ...this.floating,
            };
        },
        yellowColor() {
            return YELLOW;
        },
    },
};
</script>
