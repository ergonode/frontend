/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <TextField
                :value="code"
                solid
                required
                :error-messages="errorCodeMessage"
                :disabled="isDisabled || isDisabledByPrivileges"
                regular
                label="Code"
                hint="Status code must be unique"
                @input="setCode" />
            <div class="horizontal-wrapper">
                <CheckBox
                    :value="isDefaultStatus"
                    @input="setStatusAsDefault" />
                <span class="font--medium-12-16">
                    The initial status
                </span>
            </div>
            <ColorPicker
                :value="color"
                solid
                required
                :error-messages="errorColorMessage"
                regular
                clearable
                :fixed-content-width="false"
                label="Badge color"
                hint="Badge color is needed for presentation purpose"
                :disabled="isDisabledByPrivileges"
                @input="setColor" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductStatusForm',
    components: {
        Form: () => import('~/core/components/Form/Form'),
        FormGroup: () => import('~/core/components/Form/FormGroup'),
        TextField: () => import('~/core/components/Inputs/TextField'),
        ColorPicker: () => import('~/core/components/Inputs/Color/ColorPicker'),
        CheckBox: () => import('~/core/components/Inputs/CheckBox'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('productStatus', {
            id: (state) => state.id,
            code: (state) => state.code,
            color: (state) => state.color,
            isDefaultStatus: (state) => state.isDefaultStatus,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['WORKFLOW_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['WORKFLOW_CREATE']));
        },
        isDisabled() {
            return Boolean(this.id);
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

    .horizontal-wrapper {
        display: flex;
        align-items: center;

        span {
            margin-left: 8px;
            color: $GRAPHITE_DARK;
        }
    }
</style>
