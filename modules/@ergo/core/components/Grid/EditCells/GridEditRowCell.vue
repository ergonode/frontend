/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCell
        :column="column"
        :row="row"
        :selected="isSelected"
        @edit="onEdit">
        <IconEdit class="edit-link" />
    </GridCell>
</template>

<script>
import IconEdit from '@Core/components/Icons/Actions/IconEdit';
import GridCell from '@Core/components/Grid/GridCell';

export default {
    name: 'GridEditRowCell',
    components: {
        GridCell,
        IconEdit,
    },
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        },
        links: {
            type: Object,
            required: true,
        },
        column: {
            type: Number,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onEdit() {
            const { links: { value: { edit } } } = this.links;

            if (edit) {
                const args = edit.href.split('/');

                this.$emit('edit', args);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .edit-link {
        flex: 1;
        cursor: pointer;
    }
</style>
