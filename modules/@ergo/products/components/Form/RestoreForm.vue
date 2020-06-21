/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form :fields-keys="[restoreFieldKey]">
        <template #body>
            <FormSection
                :title="modalTitle">
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
import { SCOPE, SYSTEM_TYPES } from '@Attributes/defaults/attributes';
import { mapGetters } from 'vuex';

export default {
    name: 'RestoreForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        RadioButton: () => import('@Core/components/Inputs/RadioButton'),
    },
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
            'getLanguageById',
        ]),
        elementsToRestore() {
            return this.elements.filter(element => element.type !== SYSTEM_TYPES.SECTION);
        },
        modalTitle() {
            const { name, parent } = this.language;
            const parentName = this.getLanguageById(parent).name;

            return `Select attributes which values you want to restore from ${name} to parent translation (${parentName})`;
        },
        restoreFieldKey() {
            return 'restored_elements';
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
