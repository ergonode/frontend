/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBadge :class="`${theme}-badge`">
        <BadgeLabel :label="number" />
    </RoundedBadge>
</template>

<script>
import { THEME } from '~/defaults/theme';
import RoundedBadge from '~/core/components/Badges/RoundedBadge';
import BadgeLabel from '~/core/components/Badges/BadgeLabel';

export default {
    name: 'NumericBadge',
    components: {
        RoundedBadge,
        BadgeLabel,
    },
    props: {
        number: {
            type: Number,
            default: 0,
        },
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: (value) => Object.values(THEME).indexOf(value) !== -1,
        },
    },
};
</script>

<style lang="scss" scoped>
    .transparent-badge {
        border: $BORDER_1_GREY;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
    }

    .primary-badge {
        background-color: $GREEN;
        color: $WHITE;
    }
</style>
