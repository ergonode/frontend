/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBadge class="notification-warning-badge">
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
    computed: {
        yellowColor() {
            return YELLOW;
        },
    },
};
</script>

<style lang="scss" scoped>
.notification-warning-badge {
    position: absolute;
    top: 8px;
    right: 8px;
}
</style>
