/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCollectionDefaultCell
        :data="data"
        :drafts="drafts"
        :object-fit="objectFit"
        :multiselect="multiselect"
        :locked="locked"
        :selected="selected"
        :is-select-column="isSelectColumn"
        @select="onSelect"
        @row-action="onRowAction"
        @cell-value="onCellValueChange">
        <template #image>
            <template v-if="data.type0 === 'image'">
                <LazyImage
                    v-if="data.image"
                    class="grid-collection-default-cell__image"
                    :href="`multimedia/${data.image}/download/default`"
                    :value="data.image"
                    :object-fit="objectFit" />
                <DefaultImage
                    v-else
                    class="grid-collection-default-cell__default-image" />
            </template>
            <div
                v-else
                class="grid-image-preview-collection-cell-file">
                <IconFile />
            </div>
        </template>
    </GridCollectionDefaultCell>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridImagePreviewCollectionCell',
    props: {
        /**
         * Component data used for filling cell
         */
        data: {
            type: Object,
            required: true,
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: '',
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: true,
        },
        /**
         * Determinate if the component is not being able to edit
         */
        locked: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if selecting row column is visible
         */
        isSelectColumn: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'grid-collection-default-cell',
                {
                    'grid-collection-default-cell--selected': this.selected,
                },
            ];
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onSelect(payload) {
            this.$emit('select', payload);
        },
        onRowAction(payload) {
            this.$emit('row-action', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-image-preview-collection-cell-file {
        display: flex;
        flex: 1;
        align-items: center;
    }
</style>
