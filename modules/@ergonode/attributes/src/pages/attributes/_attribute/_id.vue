/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="code"
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
                <RemoveAttributeButton />
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
import RemoveAttributeButton from '@Attributes/components/Buttons/RemoveAttributeButton';
import PRIVILEGES from '@Attributes/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'EditAttribute',
    components: {
        RemoveAttributeButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
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
        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'attrTypes',
                'dateFormats',
                'units',
                'currencies',
            ],
        });

        await store.dispatch('attribute/getAttribute', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Attributes.attribute.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('attribute', [
            'type',
            'code',
        ]),
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Attributes/pages/attributes/_attribute/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.ATTRIBUTE.namespace);
        },
    },
    watch: {
        $route: {
            immediate: true,
            async handler() {
                const tmpTabs = getNestedTabRoutes({
                    hasAccess: this.$hasAccess,
                    routes: this.$router.options.routes,
                    route: this.$route,
                });
                const type = getKeyByValue(this.attrTypes, this.type);
                const tabs = await this.$getExtendMethod('@Core/pages/tabs', {
                    $this: this,
                    type,
                    tabs: tmpTabs,
                });

                this.asyncTabs = tabs.length ? Array.from(new Set([].concat(...tabs))) : tmpTabs;
            },
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.ATTRIBUTE,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('@Attributes.attribute._.title')}`,
        };
    },
};
</script>
