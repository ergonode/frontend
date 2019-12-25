/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="action-link"
        @click="onEdit">
        <IconEdit />
    </div>
</template>

<script>
export default {
    name: 'GridEditRowCell',
    components: {
        IconEdit: () => import('@Core/components/Icons/Actions/IconEdit'),
    },
    props: {
        params: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onEdit() {
            this.$emit('edit', this.params);
        },
    },
};
</script>

<style lang="scss" scoped>
    .action-link {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>
