/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Modal :title="selectedLanguage">
        <Form>
            <FormGroup>
                <TextField
                    v-model="nameValue"
                    solid
                    regular
                    label="Group name"
                    :disabled="!isUserAllowedToUpdate"
                    :error-messages="errorNameMessage" />
            </FormGroup>
        </Form>
    </Modal>
</template>

<script>
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import translationCardMixin from '~/mixins/card/translationCardMixin';
import TextField from '~/core/components/Inputs/TextField';
import Modal from '~/core/components/Modal/Modal';
import Form from '~/core/components/Form/Form';
import FormGroup from '~/core/components/Form/FormGroup';

export default {
    name: 'AttributeGroupTranslationCard',
    mixins: [errorValidationMixin, translationCardMixin],
    components: {
        FormGroup,
        Form,
        Modal,
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
            return this.$hasAccess(['ATTRIBUTE_UPDATE']);
        },
        errorNameMessage() {
            const nameIndex = `name_${this.languageCode}`;
            return this.elementIsValidate(nameIndex);
        },
    },
};
</script>
