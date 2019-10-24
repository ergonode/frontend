/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="footer">
        <Button
            v-for="button in buttons"
            :key="button.title"
            :title="button.title"
            :color="button.color"
            :theme="button.theme"
            :disabled="button.disabled"
            large
            @click.native="button.action" />
    </div>
</template>

<script>
import Button from '~/components/Buttons/Button';

export default {
    name: 'Footer',
    components: {
        Button,
    },
    props: {
        buttons: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .footer {
        z-index: 99;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 12px 24px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        & > button {
            margin: 0 5px;
        }
    }
</style>
