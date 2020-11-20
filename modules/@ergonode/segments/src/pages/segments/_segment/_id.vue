/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage :title="code" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import SegmentPage from '@Segments/components/Pages/SegmentPage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentEdit',
    components: {
        SegmentPage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('segment/getSegment', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Segment hasn`t been fetched properly',
                    });
                }
            },
        });
    },
    computed: {
        ...mapState('segment', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.__clearSegmentStorage();
        this.__clearConditionStorage();
        this.__clearGridDesignerStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
        ...mapActions('segment', {
            __clearSegmentStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('gridDesigner', {
            __clearGridDesignerStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.code} - Segments - Ergonode`,
        };
    },
};
</script>
