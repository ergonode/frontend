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
import { mapState, mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';
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
        ...mapState('languageSettings', {
            selectedLanguages: state => state.selectedLanguages,
        }),
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
            'getCurrentDictionary',
        ]),
        async onSave() {
            let isUpdated = false;
            const languageKeys = this.selectedLanguages.map(language => language.key);

            try {
                await this.$setLoader('saveSettings');

                if (languageKeys.length <= 0) {
                    this.$addAlert({ type: ALERT_TYPE.ERROR, message: 'At least one language needed' });
                    throw new Error();
                }

                isUpdated = await await this.updateData(languageKeys);
            } catch {
                return false;
            } finally {
                if (isUpdated !== false) {
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Languages updated' });
                    await this.getCurrentDictionary({ dictionaryName: 'languages' });
                }
                await this.$removeLoader('saveSettings');
            }

            return true;
        },
    },
};
</script>
