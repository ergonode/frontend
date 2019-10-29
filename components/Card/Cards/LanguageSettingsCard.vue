/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <Select
            :value="selectedLanguageNames"
            :options="languageNames"
            solid
            label="Languages"
            regular
            multiselect
            clearable
            @input="setSelectedLanguages" />
        <TextField
            v-model="text"
            solid
            :error-messages="['TEST']"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Small"
            small />
        <TextField
            v-model="text"
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            label="Small"
            small />
        <TextField
            v-model="text"
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            label="Regular"
            :error-messages="['TEST']"
            regular />
        <TextField
            v-model="text"
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            disabled
            label="Regular"
            regular />
        <TextArea
            v-model="text"
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            :error-messages="['TEST']"
            description="My amazing long description"
            label="Regular" />
        <TextArea
            v-model="text"
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Regular" />
        <TextArea
            v-model="text"
            left-alignment
            solid
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Regular" />
        <TextField
            v-model="text"
            left-alignment
            underline
            :error-messages="['TEST']"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Small"
            small />
        <TextField
            v-model="text"
            left-alignment
            underline
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            label="Small"
            small />
        <TextField
            v-model="text"
            left-alignment
            underline
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            label="Regular"
            :error-messages="['TEST']"
            regular />
        <TextField
            v-model="text"
            left-alignment
            underline
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            disabled
            label="Regular"
            regular />
        <TextArea
            v-model="text"
            left-alignment
            underline
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            :error-messages="['TEST']"
            description="My amazing long description"
            label="Regular" />
        <TextArea
            v-model="text"
            left-alignment
            underline
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Regular" />
        <TextArea
            v-model="text"
            left-alignment
            underline
            disabled
            placeholder="Placeholder"
            hint="I am an amazing hint!!!"
            description="My amazing long description"
            label="Regular" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';

export default {
    name: 'LanguageSettingsCard',
    components: {
        BaseCard,
        Select: () => import('~/components/Inputs/Select/Select'),
        TextField: () => import('~/components/Inputs/TextField'),
        TextArea: () => import('~/components/Inputs/TextArea'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('languageSettings', {
            languages: (state) => state.languages,
            selectedLanguageNames: (state) => state.selectedLanguageNames,
        }),
        languageNames() {
            return this.$store.state.languageSettings.languages.map((language) => language.name);
        },
    },
    data() {
        return {
            text: 'test',
        };
    },
    methods: {
        ...mapActions('languageSettings', [
            'setSelectedLanguages',
        ]),
    },
};
</script>
