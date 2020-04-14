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
// import { getMappedTreeData, getParsedTreeData } from '@Trees/models/treeMapper';
// import { updateLanguages } from '@Core/services/settings/languages.service';
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
    mounted() {
        // const { language: languageCode } = this.$store.authentication.user;
        // const treeToSet = getParsedTreeData(categories, items);

        // treeToSet.forEach((e) => {
        //     this.setDisabledElement({
        //         languageCode,
        //         elementId: e.id,
        //         disabled: true,
        //     });
        // });
        // this.setGridData(treeToSet);
        // this.setFullGridData(treeToSet);
    },
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: 'clearStorage',
            setGridData: 'setGridData',
            setFullGridData: 'setFullGridData',
        }),
        ...mapActions('dictionaries', [
            'getCurrentDictionary',
        ]),
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        async onSave() {
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
            await this.getCurrentDictionary({ dictionaryName: 'languages' });
            await this.$removeLoader('saveSettings');
        },
    },
};
</script>
