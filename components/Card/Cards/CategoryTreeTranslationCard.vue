/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard modal>
        <template #header>
            <BaseCardHeader :title="selectedLanguage" />
        </template>
        <Divider />
        <template #modal>
            <TextField
                v-model="nameValue"
                solid
                label="Tree name"
                :disabled="!isUserAllowedToUpdate"
                :error-messages="errorNameMessage" />
        </template>
    </BaseCard>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import Divider from '~/components/Dividers/Divider';
import BaseCard from '~/components/Card/BaseCard';
import BaseCardHeader from '~/components/Card/BaseCardHeader';
import TextField from '~/components/Inputs/TextField';

export default {
    name: 'CategoryTreeTranslationCard',
    mixins: [errorValidationMixin, translationCardMixin],
    components: {
        Divider,
        BaseCard,
        BaseCardHeader,
        TextField,
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
            return this.$hasAccess('CATEGORY_TREE_UPDATE');
        },
        errorNameMessage() {
            const nameIndex = `name_${this.languageCode}`;
            return this.elementIsValidate(nameIndex);
        },
    },
};
</script>
