/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #content>
            <GridViewTemplate class="grid-view-template--no-border">
                <template #sidebar>
                    <VerticalTabBar :items="verticalTabs">
                        <FadeTransition>
                            <DropZone
                                v-show="isDropZoneVisible"
                                :hover-background-color="graphiteLightColor"
                                title="REMOVE CATEGORY">
                                <template #icon="{ color }">
                                    <IconRemoveFilter :fill-color="color" />
                                </template>
                            </DropZone>
                        </FadeTransition>
                    </VerticalTabBar>
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
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import FooterActions from '@Core/components/Layout/Footer/FooterActions';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getMappedTreeData,
} from '@Core/models/mappers/languageTreeMapper';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesSettingsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        GridViewTemplate,
        FooterActions,
        Button,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        LanguagesTreeWrapper: () => import('@Core/components/LanguagesTreeDesigner/LanguagesTreeWrapper'),
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
    },
    asyncData({
        store,
    }) {
        const {
            language: languageCode,
        } = store.state.authentication.user;
        const {
            languagesTree,
        } = store.state.core;
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
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
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
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: '__clearStorage',
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
                    this.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Tree must have a root branch',
                    });
                    throw new Error();
                }
                [
                    languages,
                ] = getMappedTreeData(this.fullGridData);
                isUpdated = await this.updateLanguageTree(languages);
            } catch {
                return false;
            } finally {
                if (isUpdated !== false) {
                    await this.setLanguagesTree(languages);
                    await this.setDefaultLanguage();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Languages updated',
                    });
                }
                await this.$removeLoader('saveSettings');
            }

            return true;
        },
    },
};
</script>
