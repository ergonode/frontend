/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[codeFieldKey, colorFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="code"
                    required
                    :error-messages="errorMessages[colorFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Status code must be unique"
                    @input="setCodeValue" />
                <CheckBox
                    :value="isDefaultStatus"
                    label="Default status of new products"
                    @input="setStatusAsDefaultValue">
                    <template #append>
                        <InfoHint hint="You may set only one status as a default" />
                    </template>
                </CheckBox>
                <ColorPicker
                    :value="color"
                    required
                    :error-messages="errorMessages[colorFieldKey]"
                    clearable
                    :dismissible="false"
                    :options="colorOptions"
                    :fixed-content="false"
                    label="Badge color"
                    hint="Badge color is needed for presentation purpose"
                    :disabled="isDisabledByPrivileges"
                    @input="setColorValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    COLORS,
} from '@Core/defaults/colors';
import PRIVILEGES from '@Statuses/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductStatusForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        ColorPicker: () => import('@Core/components/Inputs/ColorPicker/ColorPicker'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
    },
    computed: {
        ...mapState('productStatus', {
            id: state => state.id,
            code: state => state.code,
            color: state => state.color,
            isDefaultStatus: state => state.isDefaultStatus,
        }),
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        colorOptions() {
            return COLORS;
        },
        codeFieldKey() {
            return 'code';
        },
        colorFieldKey() {
            return 'color';
        },
    },
    methods: {
        ...mapActions('productStatus', [
            '__setState',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        setColorValue(value) {
            this.__setState({
                key: 'color',
                value,
            });
        },
        setStatusAsDefaultValue(value) {
            this.__setState({
                key: 'isDefaultStatus',
                value,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .badge-preview {
        display: grid;
        grid-gap: 8px;

        &__badge {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
        }
    }
</style>
