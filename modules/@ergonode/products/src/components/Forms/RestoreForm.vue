/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :errors="errors"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection :title="modalTitle">
                <CheckBox
                    v-for="attribute in attributes"
                    :key="attribute.properties.attribute_code"
                    :value="elementsToRestore[attribute.properties.attribute_code]"
                    :label="attribute.label"
                    :disabled="!isAllowedToRestore(attribute.properties.scope)"
                    @input="(value) => setElementToRestore({
                        key: attribute.properties.attribute_code,
                        value,
                    })" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    SCOPE,
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import {
    mapGetters,
} from 'vuex';

export default {
    name: 'RestoreForm',
    components: {
        Form,
        FormSection,
        CheckBox,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        elements: {
            type: Array,
            default: () => [],
        },
        elementsToRestore: {
            type: Object,
            default: () => ({}),
        },
        language: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters('core', [
            'getLanguage',
        ]),
        attributes() {
            return this.elements.filter(element => element.type !== SYSTEM_TYPES.SECTION);
        },
        modalTitle() {
            const {
                name,
                parent,
            } = this.language;
            const parentName = this.getLanguage(parent).name;

            return `Select attributes which values you want to restore from ${name} to parent translation (${parentName})`;
        },
    },
    methods: {
        setElementToRestore({
            key,
            value,
        }) {
            this.$emit('update', {
                ...this.elementsToRestore,
                [key]: value,
            });
        },
        isAllowedToRestore(scope) {
            return scope !== SCOPE.GLOBAL;
        },
    },
};
</script>
