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
                            solid
                            label="Section title"
                            regular
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
import { mapActions } from 'vuex';
import { THEME } from '@Core/defaults/theme';
import ModalForm from '@Core/components/Modal/ModalForm';
import TextField from '@Core/components/Inputs/TextField';
import Button from '@Core/components/Buttons/Button';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/FormSection';
import IconFontSize from '@Core/components/Icons/Editor/IconFontSize';

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
        value: {
            type: Boolean,
            default: true,
        },
        sectionPosition: {
            type: Object,
            default: null,
        },
        sectionTitle: {
            type: String,
            default: '',
        },
        sectionIndex: {
            type: Number,
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
    watch: {
        sectionTitle() {
            this.title = this.sectionTitle;
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'addSectionElementToLayout',
            'updateSectionElementTitle',
        ]),
        onTitleChange(value) {
            this.title = value;

            if (this.title === '') this.setTitleError();
            else if (this.title.length > 255) this.setLengthError();
            else this.error = null;
        },
        onClose() {
            this.title = '';
            this.error = null;
            this.$emit('close');
        },
        onSave() {
            if (this.title !== '' && this.title.length <= 255) {
                if (!this.sectionTitle) {
                    this.addSectionElementToLayout({ ...this.sectionPosition, title: this.title });
                } else {
                    this.updateSectionElementTitle({ index: this.sectionIndex, title: this.title });
                }
                this.title = '';
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
