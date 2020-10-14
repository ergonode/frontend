/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Settings"
            :is-read-only="$isReadOnly('SETTINGS')" />
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors">
            <template
                #content="{
                    item,
                    errors: tabErrors,
                    changeValues: tabChangeValues,
                }">
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    :scope="item.scope"
                    :change-values="tabChangeValues"
                    :errors="tabErrors"
                    @fetched="onFetchedGridData"
                    @show-modal="onShowModalByType" />
            </template>
        </HorizontalRoutingTabBar>
        <Component
            :is="getModalComponentViaType"
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Settings',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    data() {
        return {
            modalType: null,
        };
    },
    computed: {
        ...mapState('feedback', [
            'changeValues',
            'errors',
        ]),
        getModalComponentViaType() {
            switch (this.modalType) {
            case 'units':
                return () => import('@Core/components/Modals/CreateUnitModalForm');
            default:
                return null;
            }
        },
    },
    methods: {
        onShowModalByType(type) {
            this.modalType = type;
            this.onShowModal();
        },
    },
    head() {
        return {
            title: 'Settings - Ergonode',
        };
    },
};
</script>
