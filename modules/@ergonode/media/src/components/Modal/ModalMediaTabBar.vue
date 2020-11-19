/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalTabBar
        class="modal-media-tab-bar"
        title="Add resources"
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
    mounted() {
        const app = document.documentElement.querySelector('.app-main');

        app.appendChild(this.$el);
    },
    beforeDestroy() {
        const app = document.documentElement.querySelector('.app-main');
        const element = document.documentElement.querySelector('.modal-media-tab-bar');

        if (element && app.contains(element)) {
            app.removeChild(element);
        }
    },
    methods: {
        onCloseModal() {
            this.$emit('close');
        },
    },
};
</script>
