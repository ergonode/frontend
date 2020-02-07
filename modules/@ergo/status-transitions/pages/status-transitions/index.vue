/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Status transition"
            :is-read-only="$isReadOnly('WORKFLOW')">
            <template #mainAction>
                <Button
                    title="NEW TRANSITION"
                    :size="smallSize"
                    :disabled="!$hasAccess(['WORKFLOW_CREATE'])"
                    @click.native="addStatusTransition">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs">
            <template #item>
                <HorizontalTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalTabBar>
        <CreateStatusTransitionModalForm
            v-if="isCreateStatusTransitionVisible"
            @close="onCloseModal"
            @created="onCreatedStatusTransition" />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';


export default {
    name: 'WorkflowTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        HorizontalTabBar: () => import('@Core/components/Tab/HorizontalTabBar'),
        HorizontalTabBarContent: () => import('@Core/components/Tab/HorizontalTabBarContent'),
        CreateStatusTransitionModalForm: () => import('@Transitions/components/Modals/CreateStatusTransitionModalForm'),
        Button,
        IconAdd,
    },
    data() {
        return {
            isCreateStatusTransitionVisible: false,
            fetchGridData: false,
        };
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    methods: {
        addStatusTransition() {
            this.isCreateStatusTransitionVisible = true;
        },
        onCloseModal() {
            this.isCreateStatusTransitionVisible = false;
        },
        onCreatedStatusTransition() {
            this.isCreateStatusTransitionVisible = false;
            this.fetchGridData = true;
        },
        onFetchedGridData() {
            this.fetchGridData = false;
        },
    },
};
</script>
