/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="progress-bar">
        <div
            class="progress-bar__progress"
            :style="progressStyle" />
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        color: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    computed: {
        progressStyle() {
            return {
                width: `${this.value}%`,
                backgroundColor: this.color,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .progress-bar {
        display: flex;
        height: 4px;
        border-radius: 2px;
        background: $lightGrey;

        &__progress {
            border-radius: 2px;
        }
    }
</style>
