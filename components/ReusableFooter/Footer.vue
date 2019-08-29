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
export default {
    name: 'Footer',
    components: {
        Button: () => import('~/components/Buttons/Button'),
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
        background-color: $white;
        box-shadow:
            0 6px 10px 0 rgba(0, 0, 0, 0.14),
            0 1px 18px 0 rgba(0, 0, 0, 0.12),
            0 3px 5px -1px rgba(0, 0, 0, 0.2);

        & > button {
            margin: 0 5px;
        }
    }
</style>
