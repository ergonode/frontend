/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-status"
        :title="$t('@Workflow.workflow.components.CreateWorkflowStatusButton.title')"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateWorkflowStatusModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    WORKFLOW_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';

export default {
    name: 'CreateWorkflowStatusButton',
    components: {
        CreateWorkflowStatusModalForm: () => import('@Workflow/components/Modals/CreateWorkflowStatusModalForm'),
    },
    mixins: [
        confirmLeaveModalMixin,
    ],
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedData() {
            this.onCloseModal();

            const event = new CustomEvent(WORKFLOW_STATUS_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
