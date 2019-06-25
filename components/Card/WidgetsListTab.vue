<template>
    <div class="tab-wrapper">
        <ListSearchHeader
            header="Widgets"
            @searchResult="onSearch" />
    </div>
</template>

<script>

export default {
    name: 'WidgetsListTab',
    components: {
        ListSearchHeader: () => import('~/components/List/ListSearchHeader'),
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
