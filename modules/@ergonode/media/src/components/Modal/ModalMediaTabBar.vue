/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalTabBar
        :title="$t('@Media.media.components.ModalMediaTabBar.title')"
        :items="tabs"
        @close="onCloseModal" />
</template>

<script>

export default {
    name: 'ModalMediaTabBar',
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onCloseModal() {
            this.$emit('close');
        },
    },
};
</script>
