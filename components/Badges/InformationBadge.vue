/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['badge', `badge--${size}`]"
        :style="backgroundColorStyle">
        <slot name="prepend" />
        <BadgeLabel
            :style="textColorStyle"
            :label="title" />
    </div>
</template>

<script>
import { SIZES } from '~/defaults/badge';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';
import BadgeLabel from '~/components/Badges/BadgeLabel';

export default {
    name: 'InformationBadge',
    components: {
        BadgeLabel,
    },
    props: {
        title: {
            type: [String, Number],
            required: true,
        },
        background: {
            type: String,
            default: WHITE,
            validator: (value) => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        color: {
            type: String,
            default: GRAPHITE_DARK,
            validator: (value) => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        size: {
            type: String,
            default: 'regular',
            validator: (value) => Object.values(SIZES).indexOf(value) !== -1,
        },
    },
    computed: {
        backgroundColorStyle() {
            return {
                backgroundColor: this.background,
            };
        },
        textColorStyle() {
            return {
                color: this.color,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge {
        display: flex;
        align-items: center;
        border-radius: 4px;
        margin: 0 8px;

        &--small {
            padding: 2px 4px;
        }

        &--regular {
            padding: 6px 8px;
        }
    }
</style>
