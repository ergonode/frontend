/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-item">
        <IconPlusMinus
            v-if="hasChildren"
            class="grid-item__icon"
            size="20"
            :state="btnExpanderIconState"
            @click.native="toggleItemExpand" />
        <span class="grid-item__title txt-fixed typo-subtitle txt--dark-graphite">
            {{ itemName }}
        </span>
        <span
            v-if="hasChildren"
            class="grid-item__categories-length txt-fixed typo-hint txt--dark-graphite">
            {{ numberOfChildren }}
        </span>
    </div>
</template>
<script>
import { Action } from '~/model/icons/Action';
import IconPlusMinus from '~/components/Icon/Actions/IconPlusMinus';

export default {
    name: 'CategoryTreeItem',
    components: {
        IconPlusMinus,
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
                ? Action.PLUS
                : Action.MINUS;
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
        $item: &;

        z-index: 5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        grid-column: 1 / 3;
        height: 100%;
        border: 1px solid $grey;
        padding: 0 12px;
        background-color: $background;
        overflow: hidden;

        &__icon, &__title {
            flex: 0 0 auto;
        }

        &__icon {
            margin-right: 8px;
            cursor: pointer;
        }

        &__title {
            margin-right: 8px;
        }

        &__categories-length {
            flex: 0 1 auto;
            border: 1px solid $grey;
            padding: 2px 8px;
            border-radius: 12px;
        }
    }
</style>
