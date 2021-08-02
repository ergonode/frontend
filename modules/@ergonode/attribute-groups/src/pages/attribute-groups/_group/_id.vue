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
                <template v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveAttributeGroupButton />
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
import RemoveAttributeGroupButton from '@AttributeGroups/components/Buttons/RemoveAttributeGroupButton';
import PRIVILEGES from '@AttributeGroups/config/privileges';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import {
    mapState,
} from 'vuex';

export default {
    name: 'EditAttributeGroup',
    components: {
        RemoveAttributeGroupButton,
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
        await store.dispatch('attributeGroup/getAttributeGroup', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@AttributeGroups.attributeGroup.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('attributeGroup', [
            'code',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@AttributeGroups/pages/attribute-groups/_group/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.ATTRIBUTE_GROUP.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.ATTRIBUTE_GROUP,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('@AttributeGroups.attributeGroup._.headTitle')}`,
        };
    },
};
</script>
