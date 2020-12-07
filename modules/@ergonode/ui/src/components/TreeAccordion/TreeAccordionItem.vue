/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :size="size"
        @click.native="onExpand">
        <div class="tree-accordion-item">
            <TreeAccordionItemNode
                v-for="position in item.level"
                :size="size"
                :key="position" />
            <IconArrowSingle :state="iconState" />
            <ListElementAction
                v-if="multiselect"
                :size="size">
                <CheckBox
                    :value="selected"
                    :disabled="item.disabled"
                    @click.native.stop
                    @input="onSelect" />
            </ListElementAction>
            <ListElementDescription>
                <ListElementTitle
                    :size="size"
                    :title="item.label || item.code" />
            </ListElementDescription>
        </div>
    </ListElement>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
} from '@Core/defaults/theme';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';
import ListElement from '@UI/components/List/ListElement';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import TreeAccordionItemNode from '@UI/components/TreeAccordion/TreeAccordionItemNode';

export default {
    name: 'TreeAccordionItem',
    components: {
        TreeAccordionItemNode,
        ListElement,
        CheckBox,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        IconArrowSingle,
    },
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
        iconState() {
            return this.item.expanded
                ? ARROW.UP
                : ARROW.DOWN;
        },
    },
    methods: {
        onExpand() {
            this.$emit('expand', this.item);
        },
        onSelect() {
            this.$emit('input', this.item);
        },
    },
};
</script>

<style lang="scss" scoped>
.tree-accordion-item {
    display: flex;
    align-items: center;
}
</style>
