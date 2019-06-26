<template>
    <div class="tab-wrapper">
        <ListSearchHeader
            header="Widgets"
            @searchResult="onSearch" />
        <WidgetsList />
    </div>
</template>

<script>

export default {
    name: 'WidgetsListTab',
    components: {
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
        WidgetsList: () => import('~/components/List/WidgetsList'),
    },
    methods: {
        onSearch() {
            // TODO: Send request to backend and update list - no request yet.
        },
    },
};
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 275px;
    }
</style>
