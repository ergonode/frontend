/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
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
                    @input="setCode" />
                <CheckBox
                    :value="isDefaultStatus"
                    label="Default status of new products"
                    @input="setStatusAsDefault">
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
                    @input="setColor" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    COLORS,
} from '@Core/defaults/colors';
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
            return (this.isDisabled && !this.$hasAccess([
                'WORKFLOW_UPDATE',
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                'WORKFLOW_CREATE',
            ]));
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
            'setCode',
            'setColor',
            'setStatusAsDefault',
        ]),
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
