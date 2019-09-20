/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <WorkflowTabs
        title="Workflow"
        :buttons="getButtons()"
        icon="Flow" />
</template>

<script>
export default {
    name: 'Workflow',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        WorkflowTabs: () => import('~/components/Pages/Tabs/WorkflowTabs'),
    },
    methods: {
        addNewStatus() {
            this.$router.push('/workflow/status/new');
        },
        getButtons() {
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
};
</script>
