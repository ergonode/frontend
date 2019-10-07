/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <WorkflowTabs
        title="Workflow"
        :buttons="getButtons"
        icon="Flow" />
</template>

<script>
export default {
    name: 'Workflow',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        WorkflowTabs: () => import('~/components/Pages/Tabs/WorkflowTabs'),
    },
    computed: {
        getButtons() {
            const isStatusesPath = /statuses/.test(this.$route.path);
            const isTransitionsPath = /transitions/.test(this.$route.path);

            if (!isStatusesPath && !isTransitionsPath) return [];
            if (isTransitionsPath) {
                return [
                    {
                        title: 'CREATE TRANSITIONS',
                        color: 'success',
                        action: this.addNewTransition,
                        disabled: !this.$hasAccess('WORKFLOW_CREATE'),
                    },
                ];
            }
            return [
                {
                    title: 'CREATE STATUS',
                    color: 'success',
                    action: this.addNewStatus,
                    disabled: !this.$hasAccess('WORKFLOW_CREATE'),
                },
            ];
        },
    },
    methods: {
        addNewStatus() {
            this.$router.push('/workflow/status/new');
        },
        addNewTransition() {
            this.$router.push('/workflow/transition/new');
        },
    },
};
</script>
