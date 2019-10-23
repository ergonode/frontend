/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="completeness-progress">
        <span class="completeness-progress__title">
            {{ caption }}
        </span>
        <ProgressBar
            :value="progress"
            :color="color" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ProductCompleteness',
    components: {
        ProgressBar: () => import('~/components/Inputs/ProgressBar'),
    },
    props: {
        language: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('productsDraft', {
            completeness: (state) => state.completeness,
        }),
        caption() {
            return `${this.progress}% Completeness of ${this.language}`;
        },
        progress() {
            const { filled, required } = this.completeness;
            const progress = Math.round(filled / (required * 100));

            if (Number.isNaN(progress)) {
                return 100;
            }
            return progress;
        },
        color() {
            return ['#f44336', '#ffc108', '#00bc87'][Math.floor(this.progress / 40)];
        },
    },
};
</script>

<style lang="scss" scoped>
    .completeness-progress {
        width: 200px;

        &__title {
            @include setFont(medium, small, medium, $GRAPHITE_DARK);
        }
    }
</style>
