/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Restore parent value"
        subtitle="Restore parent value"
        @close="onClose">
        <template #body>
            <RestoreForm
                :elements="elements"
                @update="updateRestoredElement" />
        </template>
        <template #footer>
            <Button
                title="RESTORE"
                :disabled="isRequestPending"
                @click.native="onRestore" />
            <Button
                title="CANCEL"
                :theme="secondaryTheme"
                :disabled="isRequestPending"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import { mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { THEME } from '@Core/defaults/theme';

const deleteAttributeValues = () => import('@Products/services/deleteAttributeValues.service');

export default {
    name: 'RestoreAttributeParentModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Buttons/Button'),
        RestoreForm: () => import('@Products/components/Forms/RestoreForm'),
    },
    props: {
        language: {
            type: Object,
            required: true,
        },
        elements: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isRequestPending: false,
            restoredElementsIds: [],
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        updateRestoredElement(elements) {
            this.restoredElementsIds = Object.keys(elements);
        },
        onClose() {
            this.$emit('close');
        },
        onRestore() {
            if (this.restoredElementsIds.length <= 0) {
                this.onError({ errors: { restored_elements: ['At least one attribute needed'] } });
                return;
            }

            deleteAttributeValues().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
                languageCode: this.language.code,
                elements: this.restoredElementsIds,
            }).then(() => {
                this.isRequestPending = false;
                this.removeValidationErrors();
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Values restored' });
                this.$emit('restore');
                this.$emit('close');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            }));
        },
    },
};
</script>
