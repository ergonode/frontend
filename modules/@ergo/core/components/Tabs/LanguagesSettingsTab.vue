/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <GridViewTemplate>
                <template #sidebar>
                    <VerticalTabBar :items="verticalTabs" />
                </template>
                <template #grid>
                    <LanguagesTreeWrapper />
                </template>
            </GridViewTemplate>
        </template>
        <template #footer>
            <FooterActions>
                <Button
                    title="SAVE TREE"
                    :size="smallSize"
                    :disabled="$isLoading('saveSettings')"
                    @click.native="onSave" />
            </FooterActions>
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { /* mapActions, */ } from 'vuex';
import { SIZE } from '@Core/defaults/theme';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import FooterActions from '@Core/components/Layout/Footer/FooterActions';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'LanguagesSettingsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        GridViewTemplate,
        FooterActions,
        Button,
        LanguagesTreeWrapper: () => import('@Core/components/LanguagesTreeDesigner/LanguagesTreeWrapper'),
        VerticalTabBar: () => import('@Core/components/Tab/VerticalTabBar'),
    },
    // async fetch({ store }) {
    //     await store.dispatch('languageSettings/getData');
    // },
    computed: {
        verticalTabs() {
            return [
                {
                    title: 'System languages',
                    component: () => import('@Core/components/Tabs/List/LanguagesListTab'),
                    iconComponent: () => import('@Core/components/Icons/Others/IconTranslate'),
                },
            ];
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        // ...mapActions('languageSettings', [
        //     'updateData',
        // ]),
        // ...mapActions('dictionaries', [
        //     'getCurrentDictionary',
        // ]),
        async onSave() {
            console.log('save languages');
            // await this.$setLoader('saveSettings');
            // await this.updateData();
            // await this.getCurrentDictionary({ dictionaryName: 'languages' });
            // await this.$removeLoader('saveSettings');
        },
    },
};
</script>
