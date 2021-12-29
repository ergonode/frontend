/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :size="size"
        :disabled="item.disabled"
        @click.native.prevent="onSelect">
        <div class="tree-accordion-item">
            <TreeAccordionItemNode
                v-for="position in positions"
                :size="size"
                :key="position"
                :is-expander-visible="item.childrenLength > 0 && position === positions"
                :is-expanded="item.expanded"
                @expand="onExpand" />
            <div
                v-if="multiselect"
                :class="treeAccordionItemActionClasses">
                <CheckBox
                    :value="selected"
                    :disabled="item.disabled" />
            </div>
            <ListElementDescription word-break="none">
                <ListElementTitle
                    :size="size"
                    :title="item.label || item.code" />
            </ListElementDescription>
            <ListElementAction v-if="selectedNodes.all > 0">
                <TreeAccordionItemBadge
                    :all="selectedNodes.all"
                    :selected="selectedNodes.selected" />
            </ListElementAction>
        </div>
    </ListElement>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'TreeAccordionItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        selectedNodes: {
            type: Object,
            default: () => ({
                all: 0,
                selected: 0,
            }),
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
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
    },
    computed: {
        treeAccordionItemActionClasses() {
            return [
                'tree-accordion-item__action',
                `tree-accordion-item__action--${this.size}`,
            ];
        },
        positions() {
            return this.item.level + 1;
        },
    },
    methods: {
        onExpand() {
            this.$emit('expand', this.item);
        },
        onSelect() {
            if (!this.item.disabled) {
                this.$emit('input', this.item);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.tree-accordion-item {
    display: flex;
    flex: 1;
    align-items: center;
    padding-right: 4px;

    &__action {
        display: flex;
        justify-content: center;
        align-items: center;

        &--small {
            margin: 0;
        }

        &--regular {
            margin-right: 4px;
        }
    }
}
</style>
