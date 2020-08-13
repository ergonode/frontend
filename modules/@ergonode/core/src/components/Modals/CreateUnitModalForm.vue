/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="New unit"
        @close="onClose">
        <template #body>
            <UnitForm />
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

const createUnit = () => import('@Core/services/settings/createUnit.service');

export default {
    name: 'CreateUnitModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
        UnitForm: () => import('@Core/components/Forms/UnitForm'),
    },
    mixins: [
        actionModalFormMixin({
            action: MODAL_ACTION.CREATE,
            namespace: 'Unit',
            request: createUnit,
        }),
    ],
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('units', [
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getCurrentDictionary',
        ]),
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        onCreate() {
            this.onActionRequest(async () => {
                await this.getCurrentDictionary({
                    dictionaryName: 'units',
                });
                await this.__clearStorage();
            });
        },
        onCreatedAndEdit() {
            this.onActionRequest(async (id) => {
                await this.getCurrentDictionary({
                    dictionaryName: 'units',
                });
                await this.$router.push({
                    name: 'unit-id-general',
                    params: {
                        id,
                    },
                });
            });
        },
    },
};
</script>
