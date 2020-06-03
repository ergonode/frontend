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
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { isEmpty } from '@Core/models/objectWrapper';
import { getMappedTreeData } from '@Core/models/mappers/languageTreeMapper';
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
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
    },
    asyncData({ store }) {
        const { language: languageCode } = store.state.authentication.user;
        const { languagesTree } = store.state.core;
        const treeToSet = languagesTree.map((item, i) => {
            store.dispatch('list/setDisabledElement', {
                languageCode,
                elementId: item.id,
                disabled: true,
            });

            return {
                ...item,
                row: i,
                column: item.level,
                expanded: false,
            };
        });
        store.dispatch('gridDesigner/setGridData', treeToSet);
        store.dispatch('gridDesigner/setFullGridData', treeToSet);
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
        ...mapActions('core', [
            'setLanguagesTree',
            'setDefaultLanguage',
            'updateLanguageTree',
        ]),
        async onSave() {
            let isUpdated = false;
            let languages = null;

            try {
                await this.$setLoader('saveSettings');

                if (isEmpty(this.fullGridData)) {
                    this.$addAlert({ type: ALERT_TYPE.ERROR, message: 'Tree must have a root branch' });
                    throw new Error();
                }
                [languages] = getMappedTreeData(this.fullGridData);
                isUpdated = await this.updateLanguageTree(languages);
            } catch {
                return false;
            } finally {
                if (isUpdated !== false) {
                    await this.setLanguagesTree(languages);
                    await this.setDefaultLanguage();
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Languages updated' });
                }
                await this.$removeLoader('saveSettings');
            }

            return true;
        },
    },
};
</script>
