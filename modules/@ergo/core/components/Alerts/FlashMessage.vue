/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="flash-messages">
        <SlideInGroupTransition>
            <Alert
                v-for="alert in alerts"
                :key="alert.id"
                :alert="alert" />
        </SlideInGroupTransition>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Alert from '@Core/components/Alerts/Alert';
import SlideInGroupTransition from '@Core/components/Transitions/SlideInGroupTransition';

export default {
    name: 'FlashMessage',
    components: {
        Alert,
        SlideInGroupTransition,
    },
    computed: {
        ...mapState('alerts', {
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
</style>
