/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Restore parent value"
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

const deleteAttributeValue = () => import('@Products/services/deleteAttributeValue.service');

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
            restoredElement: '',
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
        updateRestoredElement(element) {
            this.restoredElement = element;
        },
        onClose() {
            this.$emit('close');
        },
        onRestore() {
            if (!this.restoredElement) {
                this.onError({ errors: { restored_elements: ['Please mark attribute to restore'] } });
                return;
            }

            deleteAttributeValue().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
                languageCode: this.language.code,
                attributeId: this.elements.find(
                    element => element.label === this.restoredElement,
                ).properties.attribute_id,
            }).then(() => {
                this.isRequestPending = false;
                this.removeValidationErrors();
                this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: `${this.restoredElement} value restored` });
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
