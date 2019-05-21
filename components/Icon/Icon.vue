/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <i :class="[`icon--${size}`, icon, transform]" />
</template>

<script>
export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: false,
            default: 'small',
        },
        transform: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>
