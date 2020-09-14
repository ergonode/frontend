/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[codeFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    label="System name"
                    hint="System name must be unique"
                    @input="setCodeValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Trees/config/privileges';
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
        ...mapState('categoryTree', {
            treeID: state => state.treeId,
            code: state => state.code,
        }),
        isDisabled() {
            return Boolean(this.treeID);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('categoryTree', [
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        dataCyGenerator(key) {
            return `category-tree-${key}`;
        },
    },
};
</script>
