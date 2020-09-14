/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="completeness-progress"
        :title="hint">
        <span
            class="completeness-progress__title"
            v-text="title" />
        <ProgressBar
            :value="progress"
            :color="color" />
    </div>
</template>

<script>
import {
    GREEN,
    RED,
    YELLOW,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ProductCompleteness',
    components: {
        ProgressBar: () => import('@Core/components/ProgressBar/ProgressBar'),
    },
    props: {
        completeness: {
            type: Object,
            required: true,
        },
    },
    computed: {
        hint() {
            const missing = this.completeness.missing.map(field => field.name);

            return missing.length ? `Missing fields: ${missing.join(', ')}` : 'All completed';
        },
        title() {
            return `${this.progress}% Completed`;
        },
        progress() {
            const {
                filled, required,
            } = this.completeness;
            const progress = Math.round((filled / required) * 100);

            if (Number.isNaN(progress)) {
                return 100;
            }
            return progress;
        },
        color() {
            return [
                RED,
                YELLOW,
                GREEN,
            ][Math.floor(this.progress / 40)];
        },
    },
};
</script>

<style lang="scss" scoped>
    .completeness-progress {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 160px;
        cursor: help;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            margin-bottom: 4px;
        }
    }
</style>
