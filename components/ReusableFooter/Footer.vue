/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="footer">
        <BaseButton
            :title="button.title"
            :theme="button.theme"
            :disabled="button.disabled"
            @click.native="button.action" />
    </div>
</template>

<script>
import BaseButton from '~/components/Buttons/BaseButton';

export default {
    name: 'Footer',
    components: {
        BaseButton,
    },
    props: {
        button: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
</style>
