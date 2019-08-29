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
                :value="translations.label[languageCode]"
                solid
                label="Attribute name"
                regular
                :error-messages="errorLabelMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'label')" />
            <TextArea
                v-if="hasPlaceholder"
                :value="translations.placeholder[languageCode]"
                solid
                label="Placeholder"
                resize="vertical"
                :style="{height: '150px'}"
                :error-messages="errorPlaceholderMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'placeholder')" />
            <TextArea
                :value="translations.hint[languageCode]"
                solid
                label="Tooltip for writers"
                resize="none"
                :style="{height: '150px'}"
                :error-messages="errorHintMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'hint')" />
            <template v-if="hasOptions">
                <Divider />
                <AttributeOptionValues
                    :language-code="languageCode"
                    :disabled="!isUserAllowedToUpdate" />
            </template>
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
        isUserAllowedToUpdate() {
            return this.$canIUse('ATTRIBUTE_UPDATE');
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
