/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onDismiss() {
            this.$emit('dismiss');
        },
        onRemove() {
            this.$emit('remove');
        },
        onCreate() {
            this.$emit('create');
        },
        onSave() {
            this.$emit('save');
        },
    },
};
