/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="name"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <RemoveUnitButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import RemoveUnitButton from '@Core/components/Buttons/RemoveUnitButton';
import PRIVILEGES from '@Core/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UnitEdit',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        RemoveUnitButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('unit/getUnit', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Unit hasn`t been fetched properly',
                });
            },
        });
    },
    computed: {
        ...mapState('unit', [
            'name',
        ]),
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SETTINGS.namespace);
        },
    },
    beforeDestroy() {
        this.clearUnitStorage();
    },
    methods: {
        ...mapActions('unit', {
            clearUnitStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.name} - Units - Settings - Ergonode`,
        };
    },
};
</script>
