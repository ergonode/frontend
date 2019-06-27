<template>
    <ModalActionBase
        :value="value"
        title="Section title settings"
        icon="editor-font-size-24"
        @input="onClose">
        <template v-slot:body>
            <TextField
                :value="title"
                solid
                label="Section title"
                regular
                required
                :error-messages="error"
                @input="onTitleChange" />
        </template>
        <template v-slot:footer>
            <Button
                title="SAVE"
                @click.native="onSave" />
            <Button
                theme="dark"
                color="transparent"
                title="CANCEL"
                @click.native="onClose" />
        </template>
    </ModalActionBase>
</template>

<script>
import { mapActions } from 'vuex';
import ModalActionBase from '~/components/Modals/ModalActionBase';
import TextField from '~/components/Inputs/TextField';
import Button from '~/components/Buttons/Button';

export default {
    name: 'ModalSectionTitleTemplate',
    components: { TextField, ModalActionBase, Button },
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
    methods: {
        ...mapActions('templateDesigner', [
            'addSectionElementToLayout',
            'updateSectionElementTitle',
        ]),
        onTitleChange(value) {
            this.title = value;

            if (this.title === '') this.setError();
            else this.error = null;
        },
        onClose() {
            this.$emit('input', false);
        },
        onSave() {
            if (this.title !== '') {
                if (!this.sectionTitle) {
                    this.addSectionElementToLayout({ ...this.sectionPosition, title: this.title });
                } else {
                    this.updateSectionElementTitle({ index: this.sectionIndex, title: this.title });
                }
                this.title = '';
                this.$emit('input', false);
            } else {
                this.setError();
            }
        },
        setError() {
            this.error = 'Title is required!';
        },
    },
};
</script>
