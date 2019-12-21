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
import { SIZES } from '@Core/defaults/badge';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';
import BadgeLabel from '@Core/components/Badges/BadgeLabel';

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

        &--small {
            height: 16px;
            padding: 0 4px;
        }

        &--regular {
            height: 24px;
            padding: 0 8px;
        }
    }
</style>
