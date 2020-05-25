/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form :fields-keys="[restoreFieldKey]">
        <template #body>
            <FormSection
                title="Select attributes which values you want to restore to parent translation:">
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
import { SYSTEM_TYPES, SCOPE } from '@Attributes/defaults/attributes';

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
    },
    data() {
        return {
            attributeToRestore: '',
        };
    },
    computed: {
        elementsToRestore() {
            return this.elements.filter(element => element.type !== SYSTEM_TYPES.SECTION);
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
