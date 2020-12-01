/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExpandingList
        :items="items"
        :root-height="rootHeight"
        :render-ahead="renderAhead"
        :estimated-height="estimatedHeight"
        :expanded-group="expandedGroup"
        @expand="onExpandGroup">
        <template #group="{ item, index }">
            <div v-text="item" />
        </template>
        <template #item="{ item, index }">
            <div v-text="item" />
        </template>
    </ExpandingList>
</template>

<script>
import {
    ExpandingList,
} from 'vue-windowing';

export default {
    name: 'TreeAccordion',
    components: {
        ExpandingList,
    },
    props: {
        data: {
            type: [
                Object,
                Array,
            ],
            default: () => ({}),
        },
    },
    data() {
        return {
            items: {
                numberGroup: {
                    hello: {
                        hmmm: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                        ],
                    },
                },
                stringGroup: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                ],
            },
            rootHeight: 100,
            renderAhead: 2, // Buffer, +2 at top / bottom in queue
            estimatedHeight: 20, // We need to assume that there is some default height for each row which will be recalculated later
            expandedGroup: '',
        };
    },
    methods: {
        onExpandGroup(group) {
            // You may fetch data here and mutate items object
            // this.items[group] = ['a', 'b', 'c', 'd'];

            this.expandedGroup = group;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
