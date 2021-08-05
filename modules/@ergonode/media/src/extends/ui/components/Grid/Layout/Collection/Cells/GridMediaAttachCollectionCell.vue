/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-media-attach-collection-cell"
        @click="onClick">
        <template v-if="data.type0 === 'image'">
            <LazyImage
                v-if="data.image"
                class="grid-media-attach-collection-cell__image"
                :href="`multimedia/${data.image}/download/default`"
                :value="data.image"
                :object-fit="objectFit" />
            <DefaultImage
                v-else
                class="grid-media-attach-collection-cell__default-image" />
        </template>
        <div
            v-else
            class="grid-media-attach-collection-cell__file-icon">
            <IconFile />
        </div>
        <div
            class="grid-media-attach-collection-cell__fixed-title-content"
            :title="data.description">
            <span
                class="grid-media-attach-collection-cell__title"
                v-text="data.description" />
            <Toggler
                :value="cellValue"
                :disabled="locked"
                @input="onCellValueChange" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'GridMediaAttachCollectionCell',
    props: {
        data: {
            type: Object,
            required: true,
        },
        drafts: {
            type: Object,
            default: () => ({}),
        },
        objectFit: {
            type: String,
            default: '',
        },
        locked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        cellValue() {
            const draft = this.drafts[`${this.data.id}/esa_attached`];

            if (typeof draft !== 'undefined'
                && Boolean(this.data.esa_attached) !== Boolean(draft)) {
                return draft;
            }

            return this.data.esa_attached;
        },
    },
    methods: {
        onClick(event) {
            if (event.target.closest('.toggler') || !this.data.actions.edit) {
                return;
            }

            const args = this.data.actions.edit.href.split('/');

            this.$emit('row-action', {
                key: 'edit',
                value: args,
            });
        },
        onCellValueChange(value) {
            this.localValue = value;

            this.$emit('cell-value', [
                {
                    rowId: this.data.id,
                    columnId: 'esa_attached',
                    value,
                },
            ]);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-media-attach-collection-cell {
        $cell: &;

        position: relative;
        display: flex;
        flex-direction: column;
        border: $BORDER_1_GREY;
        box-sizing: border-box;
        background-color: $WHITE;
        cursor: pointer;

        &__fixed-title-content {
            display: flex;
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
        }

        &__title {
            display: flex;
            flex: 1 1 auto;
            justify-content: space-between;
            width: 0;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__image {
            height: 0;
        }

        &__default-image, &__image {
            flex: 1 1 auto;
        }

        &__file-icon {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }

        &:hover {
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
