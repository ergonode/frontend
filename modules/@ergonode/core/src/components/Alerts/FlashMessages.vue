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
                :id="alert.id"
                :type="alert.type"
                :message="alert.message" />
        </TransitionGroup>
    </div>
</template>

<script>
import Alert from '@Core/components/Alerts/Alert';
import {
    mapState,
} from 'vuex';

export default {
    name: 'FlashMessages',
    components: {
        Alert,
    },
    computed: {
        ...mapState('alert', {
            alerts: state => state.alerts,
        }),
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
