/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridWorkflowPage
        title="Product statuses"
        :buttons="getButtons()"
        icon="Flow" />
</template>

<script>
export default {
    name: 'Index',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        GridWorkflowPage: () => import('~/components/Pages/GridWorkflowPage'),
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
                    disabled: !this.$canIUse('WORKFLOW_CREATE'),
                },
            ];
        },
    },
};
</script>
