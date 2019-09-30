/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
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
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ConditionSetPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalOptTabPath = '/segments/condition-set/new/general';
        let translationTabPath = '';
        let designerPath = '';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Condition Sets',
                icon: 'Templates',
                path: '/segments/condition-sets',
            },
        ];
        this.isUserAllowedToUpdateConditionSet = this.$hasAccess('CONDITION_UPDATE');
        if (this.isEdit) {
            generalOptTabPath = `/segments/condition-set/edit/${this.$route.params.id}/general`;
            translationTabPath = `/segments/condition-set/edit/${this.$route.params.id}/translations`;
            designerPath = `/segments/condition-set/edit/${this.$route.params.id}/designer`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE CONDITION SET',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('CONDITION_DELETE'),
                },
            ];
        }
        this.tabs = [
            {
                title: 'General options',
                path: generalOptTabPath,
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
                path: translationTabPath,
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
                path: designerPath,
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
            isListElementDragging: state => state.isListElementDragging,
        }),
        isBlurVisible() {
            return this.isListElementDragging;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }
            return null;
        },
    },
};
</script>
