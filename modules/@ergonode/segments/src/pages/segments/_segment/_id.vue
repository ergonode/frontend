/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage
        :title="code"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentEdit',
    components: {
        SegmentPage: () => import('@Segments/components/Pages/SegmentPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        await store.dispatch('segment/getSegment', params);
    },
    computed: {
        ...mapState('segment', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.clearSegmentStorage();
        this.clearConditionSetStorage();
        this.clearGridDesignerStorage();
        this.removeErrors();
    },
    methods: {
        ...mapActions('condition', {
            clearConditionSetStorage: '__clearStorage',
        }),
        ...mapActions('segment', {
            removeSegment: 'removeSegment',
            clearSegmentStorage: '__clearStorage',
        }),
        ...mapActions('validations', [
            'removeErrors',
        ]),
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this segment?',
                confirmCallback: () => this.removeSegment({
                    onSuccess: this.onRemoveSegmentSuccess,
                }),
            });
        },
        onRemoveSegmentSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment removed',
            });
            this.$router.push({
                name: 'segments-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Segments - Ergonode`,
        };
    },
};
</script>
