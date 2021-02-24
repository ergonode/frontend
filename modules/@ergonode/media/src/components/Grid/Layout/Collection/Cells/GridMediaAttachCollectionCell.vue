/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="collection-cell"
        @click="onClick">
        <LazyImage
            v-if="data.image"
            :href="`multimedia/${data.image}/download/default`"
            :value="data.image"
            :object-fit="objectFit"
            :height="collectionImageHeight" />
        <img
            v-else
            class="collection-cell__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <div
            class="collection-cell__fixed-title-content"
            :title="data.description">
            <span
                class="collection-cell__title"
                v-text="data.description" />
            <Toggler
                :value="cellValue"
                :disabled="locked"
                @input="onCellValueChange" />
        </div>
    </div>
</template>

<script>
import {
    COLLECTION_IMAGE_HEIGHT,
} from '@Core/defaults/grid';
import {
    THEME,
} from '@Core/defaults/theme';
import LazyImage from '@UI/components/LazyImage/LazyImage';
import Toggler from '@UI/components/Toggler/Toggler';

export default {
    name: 'GridMediaAttachCollectionCell',
    components: {
        LazyImage,
        Toggler,
    },
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
    data() {
        return {
            isHovered: false,
        };
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
        placeholderImage() {
            return require('@UI/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        collectionImageHeight() {
            return COLLECTION_IMAGE_HEIGHT;
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
    .collection-cell {
        $cell: &;

        position: relative;
        display: flex;
        flex-direction: column;
        height: 190px;
        border: $BORDER_1_GREY;
        box-sizing: border-box;
        background-color: $WHITE;
        cursor: pointer;

        &__placeholder {
            justify-self: center;
            align-self: center;
            width: 100%;
            height: 157px;
            object-fit: none;
        }

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

        &:hover {
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
