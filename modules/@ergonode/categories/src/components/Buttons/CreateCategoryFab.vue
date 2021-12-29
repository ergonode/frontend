/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import PRIVILEGES from '@Categories/config/privileges';
import {
    CATEGORY_CREATED_EVENT_NAME,
} from '@Categories/defaults/attributes';

export default {
    name: 'CreateCategoryFab',
    components: {
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
                PRIVILEGES.CATEGORY.create,
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
        onCreatedData(id) {
            this.onCloseModal();

            const event = new CustomEvent(CATEGORY_CREATED_EVENT_NAME, {
                detail: {
                    id,
                },
            });

            document.documentElement.dispatchEvent(event);
        },
    },
};
</script>
