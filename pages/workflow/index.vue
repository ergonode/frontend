/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <WorkflowPage
        title="Workflow"
        :buttons="getButtons()"
        icon="Flow" />
</template>

<script>
export default {
    name: 'Index',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        WorkflowPage: () => import('~/components/Pages/WorkflowPage'),
    },
    methods: {
        addNewStatus() {
            this.$router.push('/workflow/statuses/new');
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
