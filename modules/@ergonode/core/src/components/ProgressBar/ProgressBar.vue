/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="progress-bar">
        <div :style="progressStyle" />
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        /**
         * Color of progress bar
         */
        color: {
            type: String,
            required: true,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * Component value
         */
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
        width: 100%;
        height: 4px;
        background-color: $GREY_LIGHT;
    }
</style>
