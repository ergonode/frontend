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
            :is-read-only="!isUserAllowedToUpdateSegments && isEdit"
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
    name: 'SegmentPage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalOptTabPath = '/segments/segment/new/general';
        let translationTabPath = '';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Segments',
                icon: 'Templates',
                path: '/segments',
            },
        ];
        this.isUserAllowedToUpdateSegments = this.$hasAccess('SEGMENT_UPDATE');
        if (this.isEdit) {
            generalOptTabPath = `/segments/segment/edit/${this.$route.params.id}/general`;
            translationTabPath = `/segments/segment/edit/${this.$route.params.id}/translations`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';


            this.buttons = [
                {
                    title: 'REMOVE SEGMENT',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('SEGMENT_DELETE'),
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
                        title: `${buttonPrefix} SEGMENT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateSegments : false,
                    },
                },
            },
            {
                title: 'Translations',
                path: translationTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} SEGMENT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateSegments : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateSegments;
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
