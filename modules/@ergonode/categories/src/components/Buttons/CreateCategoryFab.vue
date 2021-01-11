/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        :floating="floating"
        :disabled="!isAllowedToCreate"
        @click.native="onShowModal">
        <template #icon="{ color }">
            <IconAdd :fill-color="color" />
        </template>
        <CreateCategoryModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Fab>
</template>

<script>
import {
    CATEGORY_CREATED_EVENT_NAME,
} from '@Categories/defaults/attributes';
import PRIVILEGES from '@Trees/config/privileges';
import Fab from '@UI/components/Fab/Fab';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'CreateAttributeFab',
    components: {
        Fab,
        IconAdd,
        CreateCategoryModalForm: () => import('@Categories/components/Modals/CreateCategoryModalForm'),
    },
    props: {
        /**
         * The floating state, absolute position relative to parent
         * @values top, left, bottom, right
         */
        floating: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.create,
            ]);
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

            const event = new CustomEvent(CATEGORY_CREATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
