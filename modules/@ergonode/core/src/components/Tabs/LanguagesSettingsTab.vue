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
                :title="$t('core.buttons.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </GridViewTemplate>
</template>

<script>
import LanguagesTreeWrapper from '@Core/components/LanguagesTreeDesigner/LanguagesTreeWrapper';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getMappedTreeData,
} from '@Core/models/mappers/languageTreeMapper';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
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
        LanguagesTreeWrapper,
        VerticalTabBar,
    },
    mixins: [
        tabFeedbackMixin,
    ],
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
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('gridDesigner', [
            'fullGridData',
        ]),
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        verticalTabs() {
            return [
                {
                    title: 'System languages',
                    component: () => import('@Core/components/Tabs/List/LanguagesListTab'),
                    icon: () => import('@UI/components/Icons/Others/IconTranslate'),
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
    beforeDestroy() {
        this.__clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            __clearGridDesignerStorage: '__clearStorage',
        }),
        ...mapActions('core', [
            'setLanguageTree',
            'setDefaultLanguage',
            'updateLanguageTree',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            if (!isEmpty(this.fullGridData)) {
                this.isSubmitting = true;

                const [
                    languages,
                ] = getMappedTreeData(this.fullGridData);

                this.removeScopeErrors(this.scope);

                this.updateLanguageTree({
                    languages,
                    onSuccess: () => this.onUpdateSuccess(languages),
                    onError: this.onUpdateError,
                });
            }
        },
        onUpdateSuccess(languages) {
            this.setLanguageTree(languages);
            this.setDefaultLanguage();

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Languages tree has been updated',
            });
            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(message) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
            this.isSubmitting = false;
        },
    },
};
</script>
