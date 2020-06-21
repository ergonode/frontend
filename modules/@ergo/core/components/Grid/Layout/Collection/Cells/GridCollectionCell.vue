/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="collection-cell"
        @click="onClick">
        <Picture
            v-if="image"
            :object-fit="objectFit"
            :height="157"
            :image-id="image" />
        <img
            v-else
            class="collection-cell__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <div
            class="collection-cell__fixed-title-content"
            :title="description">
            <span
                class="collection-cell__title"
                v-text="description" />
        </div>
    </div>
</template>

<script>
import Picture from '@Core/components/Multimedia/Picture';
import {
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'GridCollectionCell',
    components: {
        Picture,
    },
    props: {
        actions: {
            type: Object,
            default: () => ({}),
        },
        image: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
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
        placeholderImage() {
            return require('@Core/assets/images/placeholders/template.svg'); // eslint-disable-line global-require, import/no-dynamic-require
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onClick() {
            if (this.actions.edit) {
                const args = this.actions.edit.href.split('/');

                this.$emit('edit', args);
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
            border-top: $BORDER_1_GREY;
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
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
