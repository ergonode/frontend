/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-collection-default-cell"
        @click="onClick">
        <!-- TODO: Change relation to `multimedia` href.
             INFO: Secure relationship does not break the application.
        -->
        <LazyImage
            v-if="data.image"
            :href="`multimedia/${data.image}/download/default`"
            :value="data.image"
            :object-fit="objectFit"
            :height="collectionImageHeight" />
        <img
            v-else
            class="grid-collection-default-cell__placeholder"
            :src="placeholderImage"
            alt="template icon">
        <div
            class="grid-collection-default-cell__fixed-title-content"
            :title="data.description">
            <span
                class="grid-collection-default-cell__title"
                v-text="data.description" />
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

export default {
    name: 'GridCollectionDefaultCell',
    components: {
        LazyImage,
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
        collectionImageHeight() {
            return COLLECTION_IMAGE_HEIGHT;
        },
    },
    methods: {
        onClick(event) {
            if (this.data.actions.edit && this.data.actions.get) {
                const args = this.data.actions.edit.href.split('/');

                this.$emit('row-action', {
                    key: 'edit',
                    value: args,
                });
            } else if (this.data.actions.get) {
                const args = this.data.actions.get.href.split('/');

                this.$emit('row-action', {
                    key: 'preview',
                    value: args,
                });
            } else {
                event.preventDefault();
                event.stopPropagation();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-collection-default-cell {
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
