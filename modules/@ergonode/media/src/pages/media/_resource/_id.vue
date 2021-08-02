/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveResourceButton />
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveResourceButton from '@Media/components/Buttons/RemoveResourceButton';
import PRIVILEGES from '@Media/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ResourceEdit',
    components: {
        RemoveResourceButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
    ],
    asyncData({
        app,
        store,
        params,
    }) {
        return store.dispatch('media/getResource', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Media.media.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('media', [
            'name',
            'extension',
        ]),
        title() {
            return `${this.name}.${this.extension}`;
        },
        extendedMainAction() {
            return this.$getExtendSlot('@Media/pages/media/_resource/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.MULTIMEDIA,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.name} - ${this.$t('@Media.media._.headTitle')}`,
        };
    },
};
</script>
