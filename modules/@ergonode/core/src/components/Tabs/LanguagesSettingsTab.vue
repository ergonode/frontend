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
            <LanguageInheritanceTreeDesigner
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
            <UpdateLanguagesInheritanceButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import UpdateLanguagesInheritanceButton from '@Core/components/Buttons/UpdateLanguagesInheritanceButton';
import LanguageInheritanceTreeDesigner from '@Core/components/LanguageInheritanceTreeDesigner/LanguageInheritanceTreeDesigner';
import PRIVILEGES from '@Core/config/privileges';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'LanguagesSettingsTab',
    components: {
        UpdateLanguagesInheritanceButton,
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        LanguageInheritanceTreeDesigner,
        VerticalTabBar,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        verticalTabs() {
            return [
                {
                    title: 'System languages',
                    component: () => import('@Core/components/VerticalTabs/LanguagesVerticalTab'),
                    icon: () => import('@UI/components/Icons/Others/IconTranslate'),
                    props: {
                        disabled: !this.$hasAccess([
                            PRIVILEGES.SETTINGS.update,
                        ]),
                    },
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
};
</script>
