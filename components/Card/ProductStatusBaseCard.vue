/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
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
        <ColorPicker
            :value="color"
            solid
            required
            :error-messages="errorColorMessage"
            regular
            label="Badge color"
            hint="Badge color is needed for presentation purpose"
            :disabled="isDisabledByPrivileges"
            @input="setColor" />
        <div
            v-if="color"
            class="badge-preview">
            <span class="badge-preview__label">
                Badge preview
            </span>
            <div
                :style="{backgroundColor: color}"
                class="badge-preview__badge">
                <span
                    :style="{color: textContrastColor}"
                    class="badge__text">Preview text</span>
            </div>
        </div>
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { hexToRGB, calculateContrastRatio, calculateRelativeLuminance } from '~/model/inputs/ColorContrast';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'ProductStatusBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        ColorPicker: () => import('~/components/Inputs/Color/ColorPicker'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('productStatus', {
            id: state => state.id,
            code: state => state.code,
            color: state => state.color,
        }),
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess('WORKFLOW_UPDATE'))
            || (!this.isDisabled && !this.$hasAccess('WORKFLOW_CREATE'));
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
        textContrastColor() {
            const badgeRGB = hexToRGB(this.color);
            const badgeRelativeLuminance = calculateRelativeLuminance(badgeRGB);
            const whiteColorRelativeLuminance = 0.9982138681756572;
            const contrastRatio = calculateContrastRatio(
                whiteColorRelativeLuminance, badgeRelativeLuminance,
            );

            return contrastRatio > 4.5 ? '#fff' : '#000';
        },
    },
    methods: {
        ...mapActions('productStatus', [
            'setCode',
            'setColor',
        ]),
    },
};
</script>

<style lang="scss">
    .badge-preview {
        display: grid;
        grid-gap: 8px;

        &__label {
            @include setFont(medium, regular, semiRegular, $darkGraphite);
        }

        &__badge {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
        }
    }
</style>
