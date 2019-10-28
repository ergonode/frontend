/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="badgeClasses"
        :style="badgeStyles">
        <slot name="prepend" />
        <span
            class="badge__title font--semi-bold-10-12"
            :style="badgeTextStyles"
            v-text="title" />
    </div>
</template>

<script>
import { SIZES } from '~/defaults/badge';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'InformationBadge',
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
        badgeClasses() {
            return [
                'badge',
                {
                    'badge--small': this.size === SIZES.SMALL,
                },
            ];
        },
        badgeStyles() {
            return {
                backgroundColor: this.background,
            };
        },
        badgeTextStyles() {
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
        padding: 6px 8px;
        margin: 0 8px;

        &--small {
            padding: 2px 4px;
        }

        &__title {
            text-transform: uppercase;
        }
    }
</style>
