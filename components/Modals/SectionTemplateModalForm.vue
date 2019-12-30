/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :value="value"
        title="Section title settings"
        @input="onClose">
        <template #headerPrepend>
            <IconFontSize />
        </template>
        <template #body>
            <FormGroup>
                <TextField
                    :value="title"
                    solid
                    label="Section title"
                    regular
                    required
                    :error-messages="error"
                    @input="onTitleChange" />
            </FormGroup>
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
import { THEMES } from '@Core/defaults/buttons';
import ModalForm from '@Core/components/Modal/ModalForm';
import TextField from '@Core/components/Inputs/TextField';
import Button from '@Core/components/Buttons/Button';
import FormGroup from '@Core/components/Form/FormGroup';
import IconFontSize from '@Core/components/Icons/Editor/IconFontSize';

export default {
    name: 'SectionTemplateModalForm',
    components: {
        IconFontSize,
        FormGroup,
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
    watch: {
        sectionTitle() {
            this.title = this.sectionTitle;
        },
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
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
            this.$emit('input', false);
        },
        onSave() {
            if (this.title !== '' && this.title.length <= 255) {
                if (!this.sectionTitle) {
                    this.addSectionElementToLayout({ ...this.sectionPosition, title: this.title });
                } else {
                    this.updateSectionElementTitle({ index: this.sectionIndex, title: this.title });
                }
                this.title = '';
                this.$emit('input', false);
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
