/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentPage
        :title="title"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NewSegment',
    middleware: ['tab/redirectToSegmentsGeneral'],
    components: {
        SegmentPage: () => import('~/components/Pages/SegmentPage'),
    },
    data: () => ({
        title: 'New Segment',
    }),
    computed: {
        ...mapState('segments', {
            code: state => state.code,
        }),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('segments', [
            'createSegment',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/segments');
        },
        onCreateSegmentSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Segment created' });
            this.$router.push({
                name: 'segments-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const segment = {
                code: this.code,
            };
            this.createSegment({
                data: segment,
                onSuccess: this.onCreateSegmentSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
