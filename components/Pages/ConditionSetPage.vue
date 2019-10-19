/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateConditionSet && isEdit"
            icon="Templates"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ConditionSetPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalRoute = { name: 'condition-set-new-general' };
        let translationRoute = null;
        let designerRoute = null;
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Condition Sets',
                icon: 'Templates',
                route: { name: 'condition-sets' },
            },
        ];
        this.isUserAllowedToUpdateConditionSet = this.$hasAccess('CONDITION_UPDATE');
        if (this.isEdit) {
            generalRoute = { name: 'condition-set-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'condition-set-edit-id-translations', params: this.$route.params };
            designerRoute = { name: 'condition-set-edit-id-designer', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE CONDITION SET',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('CONDITION_DELETE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconDelete'),
                    },
                },
            ];
        }
        this.tabs = [
            {
                title: 'General options',
                route: generalRoute,
                active: true,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} CONDITION SET`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateConditionSet : false,
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
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateConditionSet : false,
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
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateConditionSet : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateConditionSet;
        delete this.buttons;
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
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
