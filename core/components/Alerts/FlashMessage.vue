/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                :alert="alert" />
        </TransitionGroup>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'FlashMessage',
    components: {
        Alert: () => import('~/core/components/Alerts/Alert'),
    },
    computed: {
        ...mapState('alerts', {
            alerts: (state) => state.alerts,
        }),
    },
};
</script>

<style lang="scss" scoped>
    .flash-messages {
        position: fixed;
        bottom: 88px;
        right: 12px;
        z-index: 999999;
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
