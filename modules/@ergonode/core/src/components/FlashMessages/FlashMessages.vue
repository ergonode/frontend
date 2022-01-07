/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="flash-messages">
        <TransitionGroup
            mode="out-in"
            name="slide">
            <Alert
                v-for="alert in alerts"
                :key="alert.id"
                :id="alert.id"
                :type="alert.type"
                :message="alert.message"
                @remove="removeAlert" />
        </TransitionGroup>
    </div>
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'FlashMessages',
    computed: {
        ...mapState('alert', [
            'alerts',
        ]),
    },
    methods: {
        ...mapActions('alert', [
            'removeAlert',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .flash-messages {
        position: fixed;
        bottom: 88px;
        right: 12px;
        z-index: $Z_INDEX_ALERT;
    }

    .slide-enter-active {
        animation: slide-in 0.5s;
    }

    .slide-leave-active {
        animation: slide-in 0.5s reverse;
    }
    @keyframes slide-in {
        from {
            visibility: visible;
            transform: translateX(100%);
        }

        to {
            transform: translateX(0);
        }
    }
</style>
