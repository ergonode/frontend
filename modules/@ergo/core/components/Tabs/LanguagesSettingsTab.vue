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
import { mapActions, mapState } from 'vuex';
import { SIZE } from '@Core/defaults/theme';
// import { ALERT_TYPE } from '@Core/defaults/alerts';
import { getMappedTreeData, getParsedTreeData } from '@Core/models/mappers/languageTreeMapper';
import { getLanguageTree /* updateLanguageTree */ } from '@Core/services/settings/languages.service';
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
    asyncData({ app: { $axios }, store }) {
        const { language: languageCode } = store.state.authentication.user;
        const { allLanguages } = store.state.dictionaries;

        return Promise.all([
            store.dispatch('gridDesigner/clearStorage'),
            getLanguageTree({ $axios, $store: store }),
        ]).then(([, languahesResponse]) => {
            const { languages } = languahesResponse;
            const treeToSet = getParsedTreeData(languages, allLanguages);

            treeToSet.forEach((e) => {
                store.dispatch('list/setDisabledElement', {
                    languageCode,
                    elementId: e.id,
                    disabled: true,
                });
            });
            store.dispatch('gridDesigner/setGridData', treeToSet);
            store.dispatch('gridDesigner/setFullGridData', treeToSet);
        });
    },
    computed: {
        ...mapState('gridDesigner', {
            fullGridData: state => state.fullGridData,
        }),
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
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: 'clearStorage',
        }),
        async onSave() {
            console.log(this.fullGridData, getMappedTreeData(this.fullGridData));
            await this.$setLoader('saveSettings');
            // await updateLanguages({
            //     $axios: this.$axios,
            //     $store: this.$store,
            //     data: {
            //         languages: getMappedTreeData(this.fullGridData),
            //     },
            // }).then(() => {
            //     this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Languages updated' });
            // });
            await this.$removeLoader('saveSettings');
        },
    },
};
</script>
