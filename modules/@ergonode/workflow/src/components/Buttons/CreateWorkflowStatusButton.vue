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
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    WORKFLOW_STATUS_CREATED_EVENT_NAME,
} from '@Workflow/defaults';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateWorkflowStatusButton',
    components: {
        Button,
        IconAdd,
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
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        onShowModal() {
            this.confirmModal({
                confirmCallback: () => {
                    this.__clearFeedbackStorage();

                    this.isModalVisible = true;
                },
                proceedCallback: () => {
                    this.isModalVisible = true;
                },
            });
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
