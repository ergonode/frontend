/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SegmentsTabs
        title="Segments"
        :buttons="getButtons"
        icon="Templates" />
</template>
<script>
export default {
    name: 'Segments',
    middleware: ['tab/redirectToSegmentsGrid'],
    components: {
        SegmentsTabs: () => import('~/components/Pages/Tabs/SegmentsTabs'),
    },
    computed: {
        getButtons() {
            const isGridPath = /grid/.test(this.$route.path);
            const isConditionSetPath = /condition-set/.test(this.$route.path);

            if (!isGridPath && !isConditionSetPath) return [];
            if (isConditionSetPath) {
                return [
                    {
                        title: 'CREATE CONDITION SET',
                        color: 'success',
                        action: this.addNewConditionSet,
                        disabled: !this.$hasAccess('CONDITION_CREATE'),
                    },
                ];
            }
            return [
                {
                    title: 'CREATE SEGMENT',
                    color: 'success',
                    action: this.addNewSegment,
                    disabled: !this.$hasAccess('SEGMENT_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewSegment() {
            this.$router.push('/segments/segment/new');
        },
        addNewConditionSet() {
            this.$router.push('/condition-set/new');
        },
    },
};
</script>
