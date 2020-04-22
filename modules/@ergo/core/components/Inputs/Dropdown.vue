/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dropdown">
        {{ text }}
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        text: {
            type: String,
            default: 'Hey there!! I am your drop down',
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown {
        position: absolute;
        z-index: 999;
        width: 200px;
        height: 200px;
        background-color: #0048DF;
    }
</style>
