/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :fields-keys="[restoreFieldKey]"
        subtitle="Select attributes which values you want to restore to parent translation:">
        <template
            #body>
            <FormSection>
                <CheckBox
                    v-for="(element, index) in elements"
                    :key="index"
                    class="check-restore-element"
                    :value="false"
                    :label="element.label"
                    :disabled="!isUserAllowedToRestore(element.properties.scope)"
                    @input="value => setElementToRestore(value, element.properties.attribute_id)" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
export default {
    name: 'RestoreForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
    },
    props: {
        elements: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            attributesToRestore: {},
        };
    },
    computed: {
        restoreFieldKey() {
            return 'restored_elements';
        },
    },
    methods: {
        setElementToRestore(value, id) {
            if (value) {
                this.attributesToRestore[id] = value;
            } else {
                delete this.attributesToRestore[id];
            }
            this.$emit('update', this.attributesToRestore);
        },
        isUserAllowedToRestore(scope) {
            return scope !== 'global';
        },
    },
};
</script>
<style lang="scss" scoped>
    .check-restore-element {
        margin: 0;
    }
</style>
