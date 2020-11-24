/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab />
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
import editPageMixin from '@Core/mixins/page/editPageMixin';
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
    name: 'AttributePage',
    components: {
        RemoveAttributeButton,
    },
    mixins: [
        editPageMixin,
    ],
    data() {
        return {
            asyncTabs: null,
        };
    },
    computed: {
        ...mapState('attribute', [
            'type',
        ]),
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        extendedMainAction() {
            return this.$getExtendedComponents('@Attributes/components/Pages/AttributePage/mainAction');
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
                const tabs = await this.$extendMethods('@Core/pages/tabs', {
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
};
</script>
