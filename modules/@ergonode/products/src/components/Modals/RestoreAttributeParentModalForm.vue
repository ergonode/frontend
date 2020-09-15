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
                :language="language"
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RestoreAttributeParentModalForm',
    components: {
        ModalForm: () => import('@Core/components/Modal/ModalForm'),
        Button: () => import('@Core/components/Button/Button'),
        RestoreForm: () => import('@Products/components/Form/RestoreForm'),
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
            'removeErrors',
        ]),
        ...mapActions('product', [
            'removeProductDraft',
        ]),
        updateRestoredElement(element) {
            this.restoredElement = element;
        },
        onClose() {
            this.$emit('close');
        },
        async onRestore() {
            if (!this.restoredElement) {
                this.onError({
                    errors: {
                        restored_elements: [
                            'Please mark attribute to restore',
                        ],
                    },
                });
                return;
            }

            this.removeProductDraft({
                languageCode: this.language.code,
                attributeId: this.elements.find(
                    element => element.label === this.restoredElement,
                ).properties.attribute_id,
            }).then(() => {
                this.isRequestPending = false;
                this.removeErrors();
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: `${this.restoredElement} value restored`,
                });
                this.$emit('restore');
                this.$emit('close');
            }).catch((e) => {
                this.isRequestPending = false;
                this.onError(e.data);
            });
        },
    },
};
</script>
