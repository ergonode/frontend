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
            :href="`multimedia/${data.image}/download/default`"
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
        </div>
    </div>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import Picture from '@UI/components/Picture/Picture';

export default {
    name: 'GridCollectionDefaultCell',
    components: {
        Picture,
    },
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
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        placeholderImage() {
            return require('@UI/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClick() {
            if (this.data.actions.edit) {
                const args = this.data.actions.edit.href.split('/');

                this.$emit('row-action', {
                    key: 'edit',
                    value: args,
                });
            }
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
            flex: 1 1 auto;
            width: 0;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &:hover {
            border-color: transparent;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
