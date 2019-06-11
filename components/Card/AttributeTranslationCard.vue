/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard modal>
        <div
            slot="header"
            class="card-header">
            <span
                class="typo-title txt--dark-graphite"
                v-text="selectedLanguage" />
        </div>
        <Divider />
        <div class="modal-container">
            <TextField
                v-model="nameValue"
                solid
                label="Attribute name"
                regular
                :error-messages="errorLabelMessage"
                :disabled="!isTranslationChosen" />
            <TextArea
                v-if="hasPlaceholder"
                v-model="placeholderValue"
                solid
                label="Placeholder"
                resize="vertical"
                :error-messages="errorPlaceholderMessage"
                :disabled="!isTranslationChosen" />
            <TextArea
                v-model="tooltipValue"
                solid
                label="Tooltip for writers"
                resize="vertical"
                :error-messages="errorHintMessage"
                :disabled="!isTranslationChosen" />
            <Divider />
            <AttributeOptionValues
                v-if="hasOptions"
                :language-code="languageCode" />
        </div>
    </BaseCard>
</template>

<script>
import { mapState } from 'vuex';
import { hasPlaceholder, hasOptions } from '~/model/attributes/AttributeTypes';
import { getMappedType } from '~/model/mappers/attributeMapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/components/Inputs/TextField';
import TextArea from '~/components/Inputs/TextArea';
import Divider from '~/components/Dividers/Divider';
import BaseCard from '~/components/Card/BaseCard';
import AttributeOptionValues from '~/components/Card/AttributeOptionValues';

export default {
    name: 'AttributeTranslationCard',
    components: {
        Divider,
        TextField,
        TextArea,
        BaseCard,
        AttributeOptionValues,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        ...mapState('data', {
            attrTypes: state => state.attrTypes,
        }),
        ...mapState('attribute', {
            type: state => state.type,
        }),
        nameValue: {
            get() {
                return this.translations.label[this.languageCode] || '';
            },
            set(newName) {
                const labelIndex = 'label';
                this.setTranslationPropertyValue(
                    newName,
                    labelIndex,
                );
            },
        },
        placeholderValue: {
            get() {
                return this.translations.placeholder[this.languageCode] || '';
            },
            set(newPlaceholder) {
                const placeholderIndex = 'placeholder';
                this.setTranslationPropertyValue(
                    newPlaceholder,
                    placeholderIndex,
                );
            },
        },
        tooltipValue: {
            get() {
                return this.translations.hint[this.languageCode] || '';
            },
            set(newTooltip) {
                const hintIndex = 'hint';
                this.setTranslationPropertyValue(
                    newTooltip,
                    hintIndex,
                );
            },
        },
        hasPlaceholder() {
            return hasPlaceholder(
                getMappedType(
                    this.attrTypes,
                    this.type,
                ),
            );
        },
        hasOptions() {
            return hasOptions(
                getMappedType(
                    this.attrTypes,
                    this.type,
                ),
            );
        },
        errorLabelMessage() {
            const labelIndex = `label_${this.languageCode}`;
            return this.elementIsValidate(labelIndex);
        },
        errorPlaceholderMessage() {
            const placeholderIndex = `placeholder_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorHintMessage() {
            const hintIndex = `hint_${this.languageCode}`;
            return this.elementIsValidate(hintIndex);
        },
    },
};
</script>

<style lang="scss" scoped>
    .card-header {
        padding: 16px 24px;
    }

    .modal-container {
        display: grid;
        grid-row-gap: 16px;
        margin: 0 24px 16px;
    }
</style>
