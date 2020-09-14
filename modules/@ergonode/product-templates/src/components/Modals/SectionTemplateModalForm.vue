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
            <Form>
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
        <template #footer>
            <Button
                title="SAVE"
                @click.native="onSave" />
            <Button
                :theme="secondaryTheme"
                title="CANCEL"
                @click.native="onClose" />
        </template>
    </ModalForm>
</template>

<script>
import Button from '@Core/components/Button/Button';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import IconFontSize from '@Core/components/Icons/Editor/IconFontSize';
import TextField from '@Core/components/Inputs/TextField';
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    THEME,
} from '@Core/defaults/theme';
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
        Button,
    },
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
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
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
        onSave() {
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
