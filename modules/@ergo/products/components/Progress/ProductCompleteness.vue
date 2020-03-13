/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="completeness-progress">
        {{ caption }}
        <ProgressBar
            :value="progress"
            :color="color" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {
    GREEN, RED, YELLOW,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ProductCompleteness',
    components: {
        ProgressBar: () => import('@Core/components/Inputs/ProgressBar'),
    },
    computed: {
        ...mapState('productsDraft', {
            completeness: state => state.completeness,
        }),
        caption() {
            return `${this.progress}% Completed`;
        },
        progress() {
            const { filled, required } = this.completeness;
            const progress = Math.round((filled / required) * 100);

            if (Number.isNaN(progress)) {
                return 100;
            }
            return progress;
        },
        color() {
            return [RED, YELLOW, GREEN][Math.floor(this.progress / 40)];
        },
    },
};
</script>

<style lang="scss" scoped>
    .completeness-progress {
        width: 160px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        text-align: center;
    }
</style>
