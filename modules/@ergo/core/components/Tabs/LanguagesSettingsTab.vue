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
import { getMappedTreeData, getParsedTreeData } from '@Core/models/mappers/languageTreeMapper';
import { getLanguageTree, updateLanguageTree } from '@Core/services/settings/languages.service';
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
    asyncData({ app: { $axios }, store }) {
        const { language: languageCode } = store.state.authentication.user;
        const { allLanguages } = store.state.dictionaries;

        return getLanguageTree({ $axios, $store: store })
            .then((languahesResponse) => {
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
        ...mapState('dictionaries', {
            languagesTree: state => state.languagesTree,
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
        ...mapActions('dictionaries', [
            'getCurrentDictionary',
        ]),
        ...mapActions('core', [
            'setDefaultLanguage',
        ]),
        async onSave() {
            let isUpdated = false;

            try {
                await this.$setLoader('saveSettings');

                if (isEmpty(this.fullGridData)) {
                    this.$addAlert({ type: ALERT_TYPE.ERROR, message: 'Tree must have a root branch' });
                    throw new Error();
                }

                isUpdated = await updateLanguageTree({
                    $axios: this.$axios,
                    $store: this.$store,
                    data: {
                        languages: getMappedTreeData(this.fullGridData)[0],
                    },
                });
            } catch {
                return false;
            } finally {
                if (isUpdated !== false) {
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Languages updated' });
                    await this.getCurrentDictionary({ dictionaryName: 'languagesTree' });
                    const defaultLanguage = Object
                        .keys(this.languagesTree)
                        .find(code => this.languagesTree[code].privileges.read === true);

                    await this.setDefaultLanguage(defaultLanguage);
                }
                await this.$removeLoader('saveSettings');
            }

            return true;
        },
    },
};
</script>
