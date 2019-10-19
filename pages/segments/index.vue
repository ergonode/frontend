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
            const isConditionSetPath = /condition-sets/.test(this.$route.path);

            if (!isGridPath && !isConditionSetPath) return [];
            if (isConditionSetPath) {
                return [
                    {
                        title: 'CREATE CONDITION SET',
                        action: this.addNewConditionSet,
                        disabled: !this.$hasAccess('CONDITION_CREATE'),
                        prepend: {
                            component: () => import('~/components/Icon/Actions/IconAdd'),
                        },
                    },
                ];
            }
            return [
                {
                    title: 'CREATE SEGMENT',
                    action: this.addNewSegment,
                    disabled: !this.$hasAccess('SEGMENT_CREATE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconAdd'),
                    },
                },
            ];
        },
    },
    methods: {
        addNewSegment() {
            this.$router.push('/segments/segment/new/general');
        },
        addNewConditionSet() {
            this.$router.push('/segments/condition-set/new/general');
        },
    },
};
</script>
