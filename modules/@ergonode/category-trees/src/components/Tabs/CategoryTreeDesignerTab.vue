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
                        :title="$t('@Trees.tree.components.CategoryTreeDesignerTab.dropZoneTitle')">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
            </VerticalTabBar>
        </template>
        <template #grid>
            <CategoryTreeDesigner
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
            <UpdateCategoryTreeDesignerButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateCategoryTreeDesignerButton from '@Trees/components/Buttons/UpdateCategoryTreeDesignerButton';
import CategoryTreeDesigner from '@Trees/components/TreeDesigners/CategoryTreeDesigner';
import PRIVILEGES from '@Trees/config/privileges';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesignerTab',
    components: {
        UpdateCategoryTreeDesignerButton,
        CategoryTreeDesigner,
        GridViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    fetch() {
        const disabledElements = {
            [this.user.language]: {},
        };

        for (let i = this.tree.length - 1; i > -1; i -= 1) {
            disabledElements[this.user.language][this.tree[i].id] = true;
        }

        this.setDisabledScopeElements({
            scope: this.scope,
            disabledElements,
        });
    },
    data() {
        return {
            verticalTabs: [],
        };
    },
    computed: {
        ...mapState('categoryTree', [
            'tree',
        ]),
        ...mapState('authentication', [
            'user',
        ]),
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
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Trees/components/Tabs/CategoryTreeDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
    methods: {
        ...mapActions('list', [
            'setDisabledScopeElements',
        ]),
    },
};
</script>
