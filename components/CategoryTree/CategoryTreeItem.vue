/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-item">
        <IconArrowDouble
            v-if="hasChildren"
            class="grid-item__icon"
            :state="btnExpanderIconState"
            @click.native="toggleItemExpand" />
        <span
            class="grid-item__title txt-fixed typo-subtitle txt--dark-graphite"
            :style="getLabelStyle">
            {{ itemName }}
        </span>
        <span
            v-if="hasChildren"
            class="grid-item__categories-length txt-fixed typo-hint txt--dark-graphite">
            {{ getNumberOfCategoriesLabel }}
        </span>
    </div>
</template>
<script>
import { Arrow } from '~/model/icons/Arrow';
import IconArrowDouble from '~/components/Icon/Arrows/IconArrowDouble';

export default {
    name: 'CategoryTreeItem',
    components: {
        IconArrowDouble,
    },
    props: {
        isExpanded: {
            type: Boolean,
            default: false,
        },
        itemName: {
            type: String,
            required: true,
        },
        numberOfChildren: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        hasChildren() {
            return this.numberOfChildren > 0;
        },
        btnExpanderIconState() {
            return this.isExpanded
                ? Arrow.DOWN
                : Arrow.UP;
        },
        getLabelStyle() {
            return !this.hasChildren ? { marginLeft: '12px' } : null;
        },
        getNumberOfCategoriesLabel() {
            return `${this.numberOfChildren} ${this.numberOfChildren === 1 ? 'category' : 'categories'}`;
        },
    },
    methods: {
        toggleItemExpand() {
            this.$emit('toggleItem');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-item {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        width: 0;
        height: 100%;
        border: 1px solid $grey;
        background-color: $background;
        overflow: hidden;

        &__icon {
            flex: 0 0 auto;
            margin-left: 8px;
        }

        &__title {
            flex: 0 0 auto;
            margin: 0 8px;
        }

        &__categories-length {
            flex: 0 1 auto;
            border: 1px solid $grey;
            padding: 2px 8px;
            border-radius: 12px;
        }
    }
</style>
