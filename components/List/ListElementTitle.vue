/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        :class="['element-title', color, font]"
        v-text="title" />
</template>

<script>
export default {
    name: 'ListElementTitle',
    props: {
        title: {
            type: String,
            required: true,
        },
        small: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'txt--dark-graphite',
        },
    },
    computed: {
        font() {
            return this.small ? 'font--medium-12-16' : 'font--medium-14-20';
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-title {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
