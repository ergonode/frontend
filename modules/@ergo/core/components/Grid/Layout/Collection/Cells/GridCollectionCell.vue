/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'collection-cell',
            { 'collection-cell--hovered': isHovered },
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <Picture
            v-if="image"
            :style="{ objectFit }"
            :height="157"
            :image-id="image" />
        <img
            v-else
            class="collection-cell__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <span
            class="collection-cell__title"
            v-text="description" />
        <Fab
            v-if="isEditCell"
            class="collection-cell__edit"
            :theme="secondaryTheme"
            :floating="{ top: '8px', right: '8px' }"
            @click.native="onClick">
            <template #icon="{ color }">
                <IconEdit :fill-color="color" />
            </template>
        </Fab>
    </div>
</template>

<script>
import { THEME } from '@Core/defaults/theme';

export default {
    name: 'GridCollectionCell',
    components: {
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconEdit: () => import('@Core/components/Icons/Actions/IconEdit'),
        Picture: () => import('@Core/components/Multimedia/Picture'),
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
        isEditCell() {
            return typeof this.actions.edit !== 'undefined';
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
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

        &__edit {
            background-color: $WHITE;
            opacity: 0;
        }

        &__placeholder {
            justify-self: center;
            align-self: center;
            height: 157px;
            object-fit: none;
        }

        &__title {
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            border-top: $BORDER_1_GREY;
        }

        &--hovered {
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;

            #{$cell}__edit {
                opacity: 1;
            }
        }
    }
</style>
