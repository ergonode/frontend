/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <BaseForm>
                <LanguageSettingsCard />
            </BaseForm>
        </template>
        <template #footer>
            <Footer :button="updateButton" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import languageSettingsModule from '~/reusableStore/languageSettings/state';
import LanguageSettingsCard from '~/components/Card/Cards/LanguageSettingsCard';
import ResponsiveCenteredViewTemplate from '~/components/Layout/ResponsiveCenteredViewTemplate';
import BaseForm from '~/components/Form/BaseForm';

export default {
    name: 'LanguageSettingsTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        LanguageSettingsCard,
        ResponsiveCenteredViewTemplate,
        BaseForm,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
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
    async fetch({ app, store }) {
        app.$registerStore({
            module: languageSettingsModule,
            moduleName: 'languageSettings',
            store,
        });
        await store.dispatch('languageSettings/getData');
    },
};
</script>
