/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalTabBar
        ref="modal"
        :items="tabs"
        @close="onCloseModal" />
</template>

<script>
import ModalTabBar from '@Core/components/Modal/ModalTabBar';

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
    // mounted() {
    //     const app = document.documentElement.querySelector('.app');
    //
    //     app.appendChild(this.$refs.modal.$el);
    // },
    // beforeDestroy() {
    //     const app = document.documentElement.querySelector('.app');
    //
    //     if (app.contains(this.$refs.modal.$el)) {
    //         app.removeChild(this.$refs.modal.$el);
    //     }
    // },
    methods: {
        onCloseModal() {
            this.$emit('close');
        },
    },
};
</script>
