/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="expanding-list">
        <slot name="header" />
        <slot name="body">
            <DynamicScroller
                :items="expandedItems"
                :key-field="optionKey"
                :prerender="prerender"
                :min-item-size="estimatedHeight">
                <template #default="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :index="index">
                        <slot
                            name="item"
                            :index="index"
                            :item="item"
                            :on-expand="onExpandItem" />
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </slot>
        <slot name="footer" />
    </div>
</template>

<script>

export default {
    name: 'ExpandingList',
    props: {
        /**
         * List of the elements
         */
        items: {
            type: Array,
            default: () => [],
        },
        /**
         * How many items should be prerender
         */
        renderAhead: {
            type: Number,
            default: 0,
        },
        /**
         * The estimated height of the each element
         */
        estimatedHeight: {
            type: Number,
            default: 32,
        },
        /**
         * Determines neither if specifics elements are expanded / not expanded or all
         */
        expanded: {
            type: [
                Object,
                Boolean,
            ],
            default: false,
        },
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: 'id',
        },
    },
    data() {
        return {
            flattenedItems: [],
        };
    },
    computed: {
        prerender() {
            if (this.renderAhead > this.expandedItems.length) {
                return 0;
            }

            return this.renderAhead;
        },
        expandedItems() {
            const expandedItems = [];
            const expandedParents = {};

            this.flattenedItems.forEach((item) => {
                if (typeof expandedParents[item.id] !== 'undefined') {
                    delete expandedParents[item.id];
                }

                if (item.expanded) {
                    expandedParents[item.id] = true;
                }

                if (expandedParents[item.rootId] || item.level === 0) {
                    expandedItems.push(item);
                }
            });

            return expandedItems;
        },
    },
    mounted() {
        this.$watch(vm => [
            vm.items,
            vm.expanded,
        ], ([
            items,
            expanded,
        ]) => {
            this.flattenedItems = this.getExpandingFlattenedItems({
                items,
                expanded,
            });
        }, {
            immediate: true,
        });
    },
    methods: {
        onExpandItem(item) {
            const itemIndex = this.flattenedItems.findIndex(({
                id,
                rootId,
            }) => id === item.id && rootId === item.rootId);

            if (itemIndex !== -1) {
                this.flattenedItems[itemIndex].expanded = !this.flattenedItems[itemIndex].expanded;

                if (!this.flattenedItems[itemIndex].expanded) {
                    let i = itemIndex + 1;

                    while (i < this.flattenedItems.length - 1
                    && this.flattenedItems[i].level > this.flattenedItems[itemIndex].level) {
                        this.flattenedItems[i].expanded = false;

                        i += 1;
                    }
                }

                this.$emit('expand', item);
            }
        },
        getExpandingFlattenedItems({
            items,
            expanded,
            level = 0,
            rootId = null,
            groupId = null,
            rootIndex = 0,
        }) {
            const flattenedItems = [];

            items.forEach((item) => {
                const {
                    children = [], ...rest
                } = item;

                const isExpanded = Boolean(typeof expanded === 'object'
                    ? expanded[rest.id]
                    : expanded);

                const mappedGroupId = level === 0
                    ? rest.id
                    : groupId;

                flattenedItems.push({
                    ...rest,
                    level,
                    expanded: isExpanded,
                    groupId: mappedGroupId,
                    rootId,
                    rootIndex,
                    childrenLength: children.length,
                });

                flattenedItems.push(...this.getExpandingFlattenedItems({
                    items: children,
                    expanded,
                    level: level + 1,
                    groupId: mappedGroupId,
                    rootId: rest.id,
                    rootIndex: flattenedItems.length,
                }));
            });

            return flattenedItems;
        },
    },
};
</script>
