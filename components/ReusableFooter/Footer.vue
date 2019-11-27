/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="footer">
        <Button
            :title="button.title"
            :theme="button.theme"
            :loaded="$isLoaded('footerButton')"
            :disabled="button.disabled"
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
