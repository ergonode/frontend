/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBaseBadge :class="`${theme}-badge`">
        <BadgeLabel :label="number" />
    </RoundedBaseBadge>
</template>

<script>
import { THEME } from '~/defaults/theme';
import RoundedBaseBadge from '~/components/Badges/RoundedBaseBadge';
import BadgeLabel from '~/components/Badges/BadgeLabel';

export default {
    name: 'NumericBadge',
    components: {
        RoundedBaseBadge,
        BadgeLabel,
    },
    props: {
        number: {
            type: Number,
            required: true,
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
