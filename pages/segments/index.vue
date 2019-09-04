/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridSegmentsPage
        :title="title"
        :buttons="getButtons"
        icon="Templates" />
</template>
<script>
export default {
    name: 'Segments',
    middleware: ['tab/redirectToSegmentsGrid'],
    components: {
        GridSegmentsPage: () => import('~/components/Pages/GridSegmentsPage'),
    },
    data() {
        return {
            title: 'Segments',
        };
    },
    computed: {
        getButtons() {
            const isGridPath = /grid/.test(this.$route.path);

            if (!isGridPath) return [];
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
            this.$router.push('/segments/new');
        },
    },
};
</script>
