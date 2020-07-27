/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="collection-cell"
        @click="onClick">
        <Picture
            v-if="data.image"
            :value="data.image"
            :object-fit="objectFit"
            :height="157" />
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
                @input="onCellValueChange" />
        </div>
    </div>
</template>

<script>
import Toggler from '@Core/components/Inputs/Toggler/Toggler';
import Picture from '@Core/components/Multimedia/Picture';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridMediaAttachCollectionCell',
    components: {
        Picture,
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
            return require('@Core/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClick() {
            if (this.data.actions.edit) {
                const args = this.data.actions.edit.href.split('/');

                this.$emit('rowAction', {
                    key: 'edit',
                    value: args,
                });
            }
        },
        onCellValueChange(value) {
            this.localValue = value;

            this.$emit('cellValue', [
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
        border: $BORDER_1_GREY;
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
