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
                submit-title="RESTORE"
                proceed-title="CANCEL"
                :is-submitting="isSubmitting"
                :elements="elements"
                :language="language"
                @update="updateRestoredElement"
                @submit="onRestore"
                @proceed="onClose" />
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
import RestoreForm from '@Products/components/Forms/RestoreForm';
import ModalForm from '@UI/components/Modal/ModalForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RestoreAttributeParentModalForm',
    components: {
        ModalForm,
        RestoreForm,
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
            isSubmitting: false,
            restoredElement: '',
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
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
                this.isSubmitting = false;
                this.removeScopeErrors();
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: `${this.restoredElement} value restored`,
                });
                this.$emit('restore');
                this.$emit('close');
            }).catch((e) => {
                this.isSubmitting = false;
                this.onError({
                    errors: e.data.errors,
                });
            });
        },
    },
};
</script>
