/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create import profile"
        @close="onClose">
        <template #body>
            <ImportProfileForm />
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
import {
    MODAL_ACTION,
} from '@Core/defaults/modals';
import {
    THEME,
} from '@Core/defaults/theme';
import actionModalFormMixin from '@Core/mixins/modals/actionModalFormMixin';
import {
    mapActions,
} from 'vuex';

const createImportProfile = () => import('@Import/services/createImportProfile.service');

export default {
    name: 'CreateImportProfileModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        ImportProfileForm: () => import('@Import/components/Forms/ImportProfileForm'),
    },
    mixins: [
        actionModalFormMixin({
            action: MODAL_ACTION.CREATE,
            namespace: 'Import profile',
            request: createImportProfile,
        }),
    ],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('import', [
            'clearStorage',
        ]),
        onClose() {
            this.clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(() => {
                this.clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest((id) => {
                this.$router.push({
                    name: 'import-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
