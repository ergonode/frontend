/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <MainSettingsForm />
        </template>
        <template #footer>
            <FooterActions>
                <Button
                    title="SAVE SETTINGS"
                    :size="smallSize"
                    :disabled="$isLoading('saveSettings')"
                    @click.native="onSave" />
            </FooterActions>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapActions } from 'vuex';
import languageSettingsModule from '@Core/reusableStore/languageSettings/state';
import MainSettingsForm from '@Core/components/Forms/MainSettingsForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import FooterActions from '@Core/components/Layout/Footer/FooterActions';
import Button from '@Core/components/Buttons/Button';
import { SIZE } from '@Core/defaults/theme';

export default {
    name: 'MainSettingsTab',
    components: {
        MainSettingsForm,
        ResponsiveCenteredViewTemplate,
        FooterActions,
        Button,
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: languageSettingsModule,
            moduleName: 'languageSettings',
            store,
        });
        await store.dispatch('languageSettings/getData');
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeCreate() {
        this.$registerStore({
            module: languageSettingsModule,
            moduleName: 'languageSettings',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('languageSettings');
    },
    methods: {
        ...mapActions('languageSettings', [
            'updateData',
        ]),
        ...mapActions('dictionaries', [
            'getLanguagesDictionary',
        ]),
        async onSave() {
            await this.$setLoader('saveSettings');
            await this.updateData();
            await this.getLanguagesDictionary();
            await this.$removeLoader('saveSettings');
        },
    },
};
</script>
