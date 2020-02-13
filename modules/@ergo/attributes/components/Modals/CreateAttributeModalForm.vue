/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create attribute"
        @close="onClose">
        <template #body>
            <AttributeForm />
        </template>
        <template #footer>
            <Button
                title="CREATE"
                :disabled="isRequestPending"
                @click.native="onCreated" />
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

const createAttribute = () => import('@Attributes/services/createAttribute.service');

export default {
    name: 'CreateAttributeModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        AttributeForm: () => import('@Attributes/components/Forms/AttributeForm'),
    },
    mixins: [createModalFormMixin({ namespace: 'Attribute', createRequest: createAttribute })],
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    created() {
        this.getAttributeGroups();
    },
    methods: {
        ...mapActions('attribute', [
            'getAttributeGroups',
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreated() {
            this.onCreate(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreate((id) => {
                this.$router.push({
                    name: 'attribute-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
