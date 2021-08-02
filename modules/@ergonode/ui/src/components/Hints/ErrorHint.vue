/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        class="info-hint"
        :title="hint">
        <IconError :fill-color="redColor" />
    </label>
</template>

<script>
import {
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ErrorHint',
    props: {
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            required: true,
        },
    },
    computed: {
        redColor() {
            return RED;
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-hint {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        transform: scale(0.8);
    }
</style>
