/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
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
            <Button
                title="SAVE CHANGES"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSave">
                <template
                    v-if="isSavingTree"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Button/Button';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
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
        GridViewTemplate,
        Button,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        IconSpinner,
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
    data() {
        return {
            isSavingTree: false,
        };
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
            'setLanguageTree',
            'setDefaultLanguage',
            'updateLanguageTree',
        ]),
        async onSave() {
            if (this.isSavingTree) {
                return;
            }

            if (!isEmpty(this.fullGridData)) {
                this.isSavingTree = true;

                const [
                    languages,
                ] = getMappedTreeData(this.fullGridData);

                await this.updateLanguageTree({
                    languages,
                    onSuccess: () => this.onUpdateLanguagesTreeSuccess(languages),
                    onError: this.onUpdateLanguagesTreeError,
                });
            }
        },
        onUpdateLanguagesTreeSuccess(languages) {
            this.setLanguageTree(languages);
            this.setDefaultLanguage();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Languages tree updated',
            });
            this.isSavingTree = false;
        },
        onUpdateLanguagesTreeError(message) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
            this.isSavingTree = false;
        },
    },
};
</script>
