/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Section title settings"
        @close="onClose">
        <template #headerPrepend>
            <IconFontSize />
        </template>
        <template #body>
            <Form
                submit-title="SAVE"
                :proceed-title="$t('core.buttons.cancel')"
                @submit="onSubmit"
                @proceed="onClose">
                <template #body>
                    <FormSection>
                        <TextField
                            :value="title"
                            label="Section title"
                            required
                            :error-messages="error"
                            @input="onTitleChange" />
                    </FormSection>
                </template>
            </Form>
        </template>
    </ModalForm>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import IconFontSize from '@UI/components/Icons/Editor/IconFontSize';
import ModalForm from '@UI/components/Modal/ModalForm';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'SectionTemplateModalForm',
    components: {
        IconFontSize,
        FormSection,
        Form,
        TextField,
        ModalForm,
    },
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        index: {
            type: Number,
            default: null,
        },
        position: {
            type: Object,
            default: null,
        },
        element: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            title: '',
            error: null,
        };
    },
    mounted() {
        if (this.element) {
            this.title = this.element.label;
        }
    },
    methods: {
        ...mapActions('productTemplate', [
            'addSectionElementToLayout',
            'updateLayoutElementAtIndex',
        ]),
        onTitleChange(value) {
            this.title = value;

            if (this.title === '') this.setTitleError();
            else if (this.title.length > 255) this.setLengthError();
            else this.error = null;
        },
        onClose() {
            this.$emit('close');
        },
        onSubmit() {
            if (this.title !== '' && this.title.length <= 255) {
                if (this.position) {
                    this.addSectionElementToLayout({
                        ...this.position,
                        title: this.title,
                    });
                } else {
                    this.updateLayoutElementAtIndex({
                        index: this.index,
                        element: {
                            ...this.element,
                            label: this.title,
                        },
                    });
                }

                this.onScopeValueChange({
                    scope: this.scope,
                    fieldKey: 'templateDesigner',
                    value: true,
                });

                this.$emit('close');
            } else if (this.title === '') {
                this.setTitleError();
            } else {
                this.setLengthError();
            }
        },
        setTitleError() {
            this.error = 'Title is required.';
        },
        setLengthError() {
            this.error = 'Title exceeded 255 characters.';
        },
    },
};
</script>
