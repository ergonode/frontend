/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <h3
        class="menu-section__title"
        v-text="title" />
</template>

<script>
export default {
    name: 'MenuListHeader',
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>
