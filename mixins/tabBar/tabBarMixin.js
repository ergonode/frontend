/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        isAddingNewTabEnabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isScrollingEnabled: false,
        };
    },
    methods: {
        addTab() {
            this.items.push({
                title: 'Untitled tab',
                component: {},
                active: true,
            });
            if (!this.isScrollingEnabled) {
                this.determinateScrollingState();
            }
        },
    },
};
