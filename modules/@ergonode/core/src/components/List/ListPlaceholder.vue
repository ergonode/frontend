/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['placeholder', layoutOrientation]"
        :style="placeholderStyles">
        <div class="placeholder__description">
            <span
                class="placeholder__title"
                v-text="title" />
            <span
                class="placeholder__subtitle"
                v-text="subtitle" />
        </div>
        <slot name="append" />
    </div>
</template>

<script>
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';

export default {
    name: 'ListPlaceholder',
    props: {
        layoutOrientation: {
            type: String,
            default: LAYOUT_ORIENTATION.VERTICAL,
            validator: value => Object.values(LAYOUT_ORIENTATION).indexOf(value) !== -1,
        },
        title: {
            type: String,
            default: '',
        },
        subtitle: {
            type: String,
            default: '',
        },
        bgUrl: {
            type: String,
            required: true,
        },
    },
    computed: {
        placeholderStyles() {
            if (!this.bgUrl) return null;

            return {
                background: `url(${this.bgUrl}) no-repeat right bottom`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .placeholder {
        flex: 1;
        box-sizing: border-box;
        color: $GRAPHITE_DARK;

        &.vertical-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 64px 0 0;
        }

        &.horizontal-layout {
            width: 560px;
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
