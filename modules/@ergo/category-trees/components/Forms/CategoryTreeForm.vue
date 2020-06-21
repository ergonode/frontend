/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-key="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Tree code must be unique"
                    @input="setTreeCode" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
    },
    computed: {
        ...mapState('tree', {
            treeID: state => state.treeId,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.treeID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess([
                'CATEGORY_TREE_UPDATE',
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                'CATEGORY_TREE_CREATE',
            ]));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('tree', [
            'setTreeCode',
        ]),
        dataCyGenerator(key) {
            return `category-tree-${key}`;
        },
    },
};
</script>
