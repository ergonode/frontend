/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RoundedBadge :class="classes">
        <BadgeLabel :label="number" />
    </RoundedBadge>
</template>

<script>
import BadgeLabel from '@Core/components/Badges/BadgeLabel';
import RoundedBadge from '@Core/components/Badges/RoundedBadge';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'NumericBadge',
    components: {
        RoundedBadge,
        BadgeLabel,
    },
    props: {
        /**
         * Number displaying inside badge
         */
        number: {
            type: Number,
            default: 0,
        },
        /**
         * The theme of the component
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
    },
    computed: {
        classes() {
            return `badge--${this.theme}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge--secondary {
        border: $BORDER_1_GREY;
        background-color: $WHITE;
        color: $GRAPHITE_DARK;
    }

    .badge--primary {
        background-color: $GREEN;
        color: $WHITE;
    }
</style>
