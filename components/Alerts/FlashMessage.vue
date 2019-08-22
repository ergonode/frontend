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
                :message="alert.message"
                :type="alert.type"
                @dismiss="removeAlert(alert)" />
        </TransitionGroup>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'FlashMessage',
    components: {
        Alert: () => import('~/components/Alerts/Alert'),
    },
    computed: {
        ...mapState('alerts', {
            alerts: state => state.alerts,
        }),
    },
    methods: {
        ...mapActions('alerts', [
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
            transform: translate3d(100%, 0, 0);
        }

        to {
            transform: translate3d(0, 0, 0);
        }
    }
</style>
