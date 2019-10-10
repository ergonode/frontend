/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard modal>
        <template #header>
            <div class="card-header">
                <span
                    class="typo-title txt--dark-graphite"
                    v-text="selectedLanguage" />
            </div>
        </template>
        <Divider />
        <template #modal>
            <TextField
                :value="translations.name[languageCode]"
                solid
                label="Transition name"
                regular
                :error-messages="errorNameMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'name')" />
            <TextArea
                :value="translations.description[languageCode]"
                solid
                label="Transition description"
                regular
                resize="none"
                :style="{height: '150px'}"
                :error-messages="errorDescriptionMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="(value) => setTranslationPropertyValue(value, 'description')" />
        </template>
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
    name: 'TransitionTranslationCard',
    components: {
        Divider,
        TextField,
        TextArea,
        BaseCard,
    },
    mixins: [errorValidationMixin, translationCardMixin],
    computed: {
        isUserAllowedToUpdate() {
            return this.$hasAccess('WORKFLOW_UPDATE');
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
