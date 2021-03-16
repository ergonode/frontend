/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
                        title="REMOVE LANGUAGE">
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
    mapActions,
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
    data() {
        return {
            verticalTabs: [],
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Core/components/Tabs/LanguagesSettingsTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
    async beforeDestroy() {
        if (!this.changeValues.saved) {
            await this.getLanguageTree({});
            this.setDisabledElements({});
        }
    },
    methods: {
        ...mapActions('core', [
            'getLanguageTree',
        ]),
        ...mapActions('list', [
            'setDisabledElements',
        ]),
    },
};
</script>
