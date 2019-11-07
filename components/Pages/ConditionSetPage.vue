/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateConditionSet && isEdit"
            icon="Templates"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CONDITION SET"
                    :disabled="!$hasAccess('CONDITION_DELETE')"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ConditionSetPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalRoute = { name: 'segments-condition-set-new-general' };
        let translationRoute = { name: 'segments-condition-set-new-translations' };
        let designerRoute = { name: 'segments-condition-set-new-designer' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Condition Sets',
                icon: 'Templates',
                route: { name: 'segments-condition-sets' },
            },
        ];
        this.isUserAllowedToUpdateConditionSet = this.$hasAccess('CONDITION_UPDATE');
        if (this.isEdit) {
            generalRoute = { name: 'segments-condition-set-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'segments-condition-set-edit-id-translations', params: this.$route.params };
            designerRoute = { name: 'segments-condition-set-edit-id-designer', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CONDITION SET`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateConditionSet,
                        },
                    },
                },
                {
                    title: 'Translations',
                    route: translationRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CONDITION SET`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateConditionSet,
                        },
                    },
                },
                {
                    title: 'Designer',
                    route: designerRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CONDITION SET`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateConditionSet,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CONDITION SET`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateConditionSet;
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isBlurVisible) {
                return { zIndex: '10' };
            }
            return null;
        },
    },
};
</script>
