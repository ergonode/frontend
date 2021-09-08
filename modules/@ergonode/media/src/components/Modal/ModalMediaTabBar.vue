/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalTabBar
        :title="$t('@Media.media.components.ModalMediaTabBar.title')"
        :items="tabs"
        @close="onCloseModal" />
</template>

<script>
import ModalTabBar from '@UI/components/Modal/ModalTabBar';

export default {
    name: 'ModalMediaTabBar',
    components: {
        ModalTabBar,
    },
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
