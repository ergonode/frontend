/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Templates.productTemplate.components.SectionTemplateModalForm.title')"
        @close="onClose">
        <template #headerPrepend>
            <IconFontSize />
        </template>
        <template #body>
            <Form
                :submit-title="$t('@Templates._.submit')"
                :proceed-title="$t('@Templates._.cancel')"
                @submit="onSubmit"
                @proceed="onClose">
                <template #body>
                    <FormSection>
                        <TextField
                            :value="title"
                            :label="$t('@Templates.productTemplate.components.SectionTemplateModalForm.sectionLabel')"
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
import IconFontSize from '@UI/components/Icons/Editor/IconFontSize';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'SectionTemplateModalForm',
    components: {
        IconFontSize,
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
            this.error = this.$t('@Templates.productTemplate.components.SectionTemplateModalForm.requiredError');
        },
        setLengthError() {
            this.error = this.$t('@Templates.productTemplate.components.SectionTemplateModalForm.maxCharactersError');
        },
    },
};
</script>
