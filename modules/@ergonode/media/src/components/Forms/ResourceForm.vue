/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Media.media.components.ResourceForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextField
                    :value="name"
                    required
                    :error-messages="errors[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :label="$t('@Media.media.components.ResourceForm.filenameLabel')"
                    @input="setNameValue" />
                <UploadImageFile
                    v-if="type === 'image'"
                    :value="id"
                    :editable="false"
                    :downloadable="true"
                    :label="$t('@Media.media.components.ResourceForm.previewLabel')"
                    height="246px" />
                <FilePreview
                    v-else
                    :value="id"
                    :downloadable="true"
                    :label="$t('@Media.media.components.ResourceForm.previewLabel')" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import FilePreview from '@Media/components/Inputs/FilePreview';
import UploadImageFile from '@Media/components/Inputs/UploadFile/UploadImageFile';
import PRIVILEGES from '@Media/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceForm',
    components: {
        FilePreview,
        UploadImageFile,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('media', [
            'id',
            'name',
            'type',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Media/components/Forms/ResourceForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.create,
            ]));
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('media', [
            '__setState',
        ]),
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
        setNameValue(value) {
            this.__setState({
                key: this.nameFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.nameFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `resource-${key}`;
        },
    },
};
</script>
