/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection :title="modalTitle">
                <RadioButton
                    v-for="(element, index) in elementsToRestore"
                    :key="index"
                    :value="attributeToRestore"
                    :label="element.label"
                    :disabled="!isUserAllowedToRestore(element.properties.scope)"
                    @input="setElementToRestore" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    SCOPE,
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import RadioButton from '@Core/components/Inputs/RadioButton';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapGetters,
} from 'vuex';

export default {
    name: 'RestoreForm',
    components: {
        Form,
        FormSection,
        RadioButton,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        elements: {
            type: Array,
            default: () => [],
        },
        language: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            attributeToRestore: '',
        };
    },
    computed: {
        ...mapGetters('core', [
            'getLanguage',
        ]),
        elementsToRestore() {
            return this.elements.filter(element => element.type !== SYSTEM_TYPES.SECTION);
        },
        modalTitle() {
            const {
                name, parent,
            } = this.language;
            const parentName = this.getLanguage(parent).name;

            return `Select attributes which values you want to restore from ${name} to parent translation (${parentName})`;
        },
    },
    methods: {
        setElementToRestore(value) {
            this.attributeToRestore = value;

            this.$emit('update', value);
        },
        isUserAllowedToRestore(scope) {
            return scope !== SCOPE.GLOBAL;
        },
    },
};
</script>
