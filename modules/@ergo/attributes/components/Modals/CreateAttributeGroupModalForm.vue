/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create attribute group"
        @close="onClose">
        <template #body>
            <AttributeGroupForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreate" />
            <Button
                title="CREATE & EDIT"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onCreatedAndEdit" />
        </template>
    </ModalForm>
</template>

<script>
import { mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';
import createModalFormMixin from '@Core/mixins/modals/createModalFormMixin';

const createAttributeGroup = () => import('@Attributes/services/createAttributeGroup.service');

export default {
    name: 'CreateAttributeGroupModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        AttributeGroupForm: () => import('@Attributes/components/Forms/AttributeGroupForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Attribute group', createRequest: createAttributeGroup })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('attribute', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onCreateRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreateRequest((id) => {
                this.$router.push({
                    name: 'attribute-group-id',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
