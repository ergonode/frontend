/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="new-segment"
        title="NEW SEGMENT"
        :size="smallSize"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #prepend="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateSegmentModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Button>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Segments/config/privileges';
import {
    SEGMENT_CREATED_EVENT_NAME,
} from '@Segments/defaults';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'CreateSegmentButton',
    components: {
        Button,
        IconAdd,
        CreateSegmentModalForm: () => import('@Segments/components/Modals/CreateSegmentModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.create,
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

            const event = new CustomEvent(SEGMENT_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
