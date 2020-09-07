/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <MainSettingsForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="SAVE CHANGES"
                        type="SUBMIT">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </MainSettingsForm>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import MainSettingsForm from '@Core/components/Forms/MainSettingsForm';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'MainSettingsTab',
    components: {
        MainSettingsForm,
        CenterViewTemplate,
        IconSpinner,
        Button,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('core', {
            languagesTree: state => state.languagesTree,
        }),
    },
    methods: {
        ...mapActions('core', [
            'getLanguages',
            'updateLanguages',
        ]),
        onSubmit(selectedLanguages) {
            if (this.isSubmitting) {
                return;
            }

            if (selectedLanguages.length < 1) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'At least one language needed',
                });

                return;
            }

            const languageKeys = selectedLanguages.map(language => language.key);
            const isUsedOnTree = this.languagesTree.find(
                ({
                    code,
                }) => languageKeys.indexOf(code) === -1,
            );

            if (isUsedOnTree) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'You cannot deactivate languages used on the language tree',
                });

                return;
            }

            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Changes in language settings will affect the entire application.',
                confirmCallback: () => this.onAgree(languageKeys),
            });
        },
        async onAgree(selectedLanguages) {
            this.isSubmitting = true;

            await this.updateLanguages({
                languages: selectedLanguages,
                onError: this.onUpdateLanguagesError,
                onSuccess: this.onUpdateLanguagesSuccess,
            });
        },
        async onUpdateLanguagesSuccess() {
            await this.getLanguages();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Languages updated',
            });
            this.isSubmitting = false;
        },
        onUpdateLanguagesError(message) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
            this.isSubmitting = false;
        },
    },
};
</script>
