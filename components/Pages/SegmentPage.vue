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
        let translationTabPath = '/segments/segment/new/translations';
        let designerPath = '/segments/segment/new/designer';
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
            designerPath = `/segments/segment/edit/${this.$route.params.id}/designer`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            // TODO: uncomment when we create removal options
            // this.buttons = [
            //     {
            //         title: 'REMOVE TREE',
            //         color: 'transparent',
            //         action: this.onRemove,
            //         theme: 'dark',
            //         icon: 'sprite-system system-trash--deactive',
            //     },
            // ];
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
            {
                title: 'Designer',
                path: designerPath,
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
