/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <MainSettingsForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import MainSettingsForm from '@Core/components/Forms/MainSettingsForm';
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
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
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
        ...mapActions('feedback', [
            'onError',
            'markChangeValuesAsSaved',
        ]),
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
                    message: 'At least one language is required',
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
                confirmCallback: () => this.onConfirm(languageKeys),
            });
        },
        async onConfirm(selectedLanguages) {
            this.isSubmitting = true;

            await this.updateLanguages({
                languages: selectedLanguages,
                scope: this.scope,
                onError: this.onUpdateError,
                onSuccess: this.onUpdateSuccess,
            });
        },
        async onUpdateSuccess() {
            await this.getLanguages();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Languages have been updated',
            });
            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
