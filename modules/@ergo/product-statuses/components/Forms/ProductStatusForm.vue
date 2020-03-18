/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form title="General">
        <FormGroup>
            <TextField
                :value="code"
                solid
                required
                :error-messages="errorCodeMessage"
                :disabled="isDisabled || isDisabledByPrivileges"
                regular
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
                solid
                required
                :error-messages="errorColorMessage"
                regular
                clearable
                :options="colorOptions"
                :fixed-content="false"
                label="Badge color"
                hint="Badge color is needed for presentation purpose"
                :disabled="isDisabledByPrivileges"
                @input="setColor" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { STATUS as COLOR_STATUS } from '@Statuses/defaults/colors';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductStatusForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        ColorPicker: () => import('@Core/components/Inputs/ColorPicker/ColorPicker'),
        CheckBox: () => import('@Core/components/Inputs/CheckBox'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('productStatus', {
            id: state => state.id,
            code: state => state.code,
            color: state => state.color,
            isDefaultStatus: state => state.isDefaultStatus,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['WORKFLOW_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['WORKFLOW_CREATE']));
        },
        isDisabled() {
            return Boolean(this.id);
        },
        colorOptions() {
            return COLOR_STATUS;
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
        errorColorMessage() {
            const colorIndex = 'color';
            return this.elementIsValidate(colorIndex);
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
