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
import { THEME } from '@Core/defaults/theme';
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
            return THEME.SECONDARY;
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
        onCreate() {
            this.onCreateRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onCreateRequest((id) => {
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
