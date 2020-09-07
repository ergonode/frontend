/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <MainSettingsForm
                @selectedLanguages="setSelectedLanguages" />
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
import Button from '@Core/components/Button/Button';
import MainSettingsForm from '@Core/components/Forms/MainSettingsForm';
import FooterActions from '@Core/components/Layout/Footer/FooterActions';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsTab',
    components: {
        MainSettingsForm,
        ResponsiveCenteredViewTemplate,
        FooterActions,
        Button,
    },
    data() {
        return {
            selectedLanguages: [],
        };
    },
    computed: {
        ...mapState('core', {
            languagesTree: state => state.languagesTree,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('core', [
            'getLanguages',
            'updateLanguages',
        ]),
        setSelectedLanguages(selectedLanguages) {
            this.selectedLanguages = selectedLanguages;
        },
        onSave() {
            const languageKeys = this.selectedLanguages.map(language => language.key);
            const isUsedOnTree = this.languagesTree.find(
                ({
                    code,
                }) => !languageKeys.includes(code),
            );

            if (languageKeys.length <= 0) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'At least one language needed',
                });
                return false;
            }
            if (isUsedOnTree) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Language you want to deactivate is used on the language tree',
                });
                return false;
            }

            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Changes in language settings will affect the entire application.',
                confirmCallback: () => this.onAgree(),
            });
            return true;
        },
        async onAgree() {
            let isUpdated = false;
            const languageKeys = this.selectedLanguages.map(language => language.key);

            try {
                this.$setLoader('saveSettings');
                isUpdated = await this.updateLanguages(languageKeys);
            } catch {
                return false;
            } finally {
                if (isUpdated !== false) {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Languages updated',
                    });
                    await this.getLanguages();
                }
                this.$removeLoader('saveSettings');
            }
            return true;
        },
    },
};
</script>
