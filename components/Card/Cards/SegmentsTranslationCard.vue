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
                :value="translations.name[languageCode]"
                solid
                label="Segment name"
                regular
                :error-messages="errorNameMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'name')" />
            <TextArea
                :value="translations.description[languageCode]"
                solid
                label="Description"
                resize="vertical"
                :style="{height: '150px'}"
                :error-messages="errorDescriptionMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'description')" />
        </div>
    </BaseCard>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/components/Inputs/TextField';
import TextArea from '~/components/Inputs/TextArea';
import Divider from '~/components/Dividers/Divider';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'SegmentsTranslationCard',
    components: {
        Divider,
        TextField,
        TextArea,
        BaseCard,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess('SEGMENT_UPDATE');
        },
        errorDescriptionMessage() {
            const placeholderIndex = `description_${this.languageCode}`;
            return this.elementIsValidate(placeholderIndex);
        },
        errorNameMessage() {
            const hintIndex = `name_${this.languageCode}`;
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
