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
            removeSegment: 'removeSegment',
            __clearSegmentStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('gridDesigner', {
            __clearGridDesignerStorage: '__clearStorage',
        }),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to delete this segment?',
                applyTitle: 'YES, I\'M SURE',
                action: () => this.removeSegment({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment removed',
            });
            this.$router.push({
                name: 'segments-grid',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Segmet hasn`t been deleted',
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
