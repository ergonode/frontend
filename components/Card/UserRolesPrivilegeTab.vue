/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="tab__grid">
            <GridWrapper
                store-namespace="privilegesGrid"
                :rows-height="rowsHeight"
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
            gridConfiguration: {
                rows: {
                    height: 32,
                },
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
    computed: {
        actionPaths() {
            return {
                getData: `${this.userLanguageCode}/accounts`,
                routerEdit: 'users-edit-id',
            };
        },
        rowsHeight: {
            get() {
                const { height } = this.gridConfiguration.rows;
                return height;
            },
            set(value) {
                this.gridConfiguration.rows.height = value;
            },
        },
    },
    methods: {
        // ...mapActions('privilegesGrid', [
        //     'getData',
        // ]),
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'privilegesGrid',
            store,
        });
        // const { privileges } = store.state.data;
        const gridPath = `${store.state.authentication.user.language}/accounts`;
        await store.dispatch('privilegesGrid/getData', { path: gridPath });
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
