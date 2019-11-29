/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseModalCard>
        <BaseCard :title="selectedLanguage">
            <TextField
                v-model="nameValue"
                solid
                regular
                label="Category name"
                :disabled="!isUserAllowedToUpdate"
                :error-messages="errorNameMessage" />
        </BaseCard>
    </BaseModalCard>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import BaseCard from '~/components/Card/BaseCard';
import TextField from '~/core/components/Inputs/TextField';
import BaseModalCard from '~/components/Card/BaseModalCard';

export default {
    name: 'CategoryTranslationCard',
    mixins: [errorValidationMixin, translationCardMixin],
    components: {
        BaseCard,
        TextField,
        BaseModalCard,
    },
    computed: {
        nameValue: {
            get() {
                return this.translations.name[this.languageCode];
            },
            set(newName) {
                const nameIndex = 'name';
                this.setTranslationPropertyValue(newName, nameIndex);
            },
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess(['CATEGORY_UPDATE']);
        },
        errorNameMessage() {
            const nameIndex = `name_${this.languageCode}`;
            return this.elementIsValidate(nameIndex);
        },
    },
};
</script>
