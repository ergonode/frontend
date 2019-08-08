/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <GridWrapper
                store-namespace="privilegesGrid"
                :rows-height="32"
                :action-paths="actionPaths" />
        </div>
        <Footer
            slot="footer"
            :buttons="[...updateButton]" />
    </div>
</template>

<script>
import gridModule from '~/reusableStore/grid/state';
import GridWrapper from '~/components/Grid/Wrappers/GridWrapper';


export default {
    name: 'UsersRolesPrivilegeTab',
    components: {
        GridWrapper,
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    data() {
        return {
            actionPaths: {
                getData: '',
                routerEdit: '',
            },
        };
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('privilegesGrid');
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store,
        });
        // const { privileges: privilegesDictionary } = store.state.data;
        // const { privileges } = store.state.roles;
        const columns = [
            {
                editable: true,
                id: 'name',
                label: '',
                type: 'TEXT',
                filterable: true,
            },
            {
                editable: true,
                id: 'create',
                label: 'Create',
                type: 'CHECK',
                filterable: true,
            },
            {
                editable: false,
                id: 'read',
                label: 'Read',
                type: 'CHECK',
                filterable: true,
            },
            {
                editable: false,
                id: 'update',
                label: 'Update',
                type: 'CHECK',
                filterable: true,
            },
            {
                editable: false,
                id: 'delete',
                label: 'Delete',
                type: 'CHECK',
                filterable: true,
            },
        ];
        const rows = [
            {
                name: 'User',
                create: false,
                read: true,
                update: true,
                delete: true,
            },
            {
                name: 'Role',
                create: false,
                read: true,
                update: false,
                delete: true,
            },
        ];
        await store.dispatch('privilegesGrid/setGridData', { columns, rows });
    },
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $white;

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin: 12px 12px 0;
            overflow: hidden;
        }
    }
</style>
