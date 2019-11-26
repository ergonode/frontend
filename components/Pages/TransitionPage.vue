/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateTransitions && isEdit"
            icon="Flow"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #mainAction>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE TRANSITION"
                    :disabled="!$hasAccess(['WORKFLOW_DELETE'])"
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
    </BasePage>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'TransitionPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalRoute = { name: 'workflow-transition-new-general' };
        let designerRoute = { name: 'workflow-transition-new-designer' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                route: { name: 'workflow-transitions' },
            },
        ];
        this.isUserAllowedToUpdateTransitions = this.$hasAccess(['WORKFLOW_UPDATE']);
        if (this.isEdit) {
            generalRoute = { name: 'workflow-transition-edit-id-general', params: this.$route.params };
            designerRoute = { name: 'workflow-transition-edit-id-designer', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TRANSITION`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateTransitions,
                        },
                    },
                },
                {
                    title: 'Conditions',
                    route: designerRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TRANSITION`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateTransitions,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TRANSITION`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
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
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateTransitions;
    },
};
</script>
