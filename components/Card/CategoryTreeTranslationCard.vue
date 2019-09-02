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
                label="Tree name"
                :disabled="!isUserAllowedToUpdate"
                :error-messages="errorNameMessage" />
        </div>
    </BaseCard>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import Divider from '~/components/Dividers/Divider';
import BaseCard from '~/components/Card/BaseCard';
import TextField from '~/components/Inputs/TextField';

export default {
    name: 'CategoryTreeTranslationCard',
    mixins: [errorValidationMixin, translationCardMixin],
    components: {
        Divider,
        BaseCard,
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
