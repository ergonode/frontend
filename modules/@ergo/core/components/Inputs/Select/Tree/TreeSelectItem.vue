/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        class="tree-select__item"
        :small="$attrs.small"
        :regular="$attrs.regular"
        :selected="isOptionSelected">
        <template #default="{ isSelected }">
            <div
                class="item__content"
                @click.prevent="onSelectValue">
                <ListElementAction
                    v-if="$attrs.multiselect"
                    :small="$attrs.small">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :small="$attrs.small"
                        :hint="$attrs.option.hint"
                        :title="$attrs.option.name || `#${$attrs.option.key}`" />
                </ListElementDescription>
            </div>
            <List
                class="item__list"
                v-if="hasChildren">
                <TreeSelectItem
                    v-for="(child, index) in $attrs.option.childrens"
                    :key="index"
                    v-bind="$attrs"
                    :option="child" />
            </List>
        </template>
    </ListElement>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import ListElementAction from '@Core/components/List/ListElementAction';
import TreeSelectItem from '@Core/components/Inputs/Select/Tree/TreeSelectItem';
import CheckBox from '@Core/components/Inputs/CheckBox';

export default {
    name: 'TreeSelectItem',
    components: {
        ListElement: () => import('@Core/components/List/ListElement'),
        List: () => import('@Core/components/List/List'),
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        TreeSelectItem,
        CheckBox,
    },
    inheritAttrs: false,
    computed: {
        ...mapState('inputHelpers', {
            selectedOptions: state => state.selectedOptions,
        }),
        hasChildren() {
            const { childrens } = this.$attrs.option;

            return childrens && childrens.length > 0;
        },
        isOptionSelected() {
            const { option, label, multiselect } = this.$attrs;

            if (multiselect) {
                return this.selectedOptions[label]
                    && this.selectedOptions[label].some(({ id }) => id === option.id);
            }
            return option.id === this.selectedOptions[label].id;
        },
    },
    methods: {
        ...mapActions('inputHelpers', [
            'setOption',
            'setOptions',
        ]),
        onSelectValue() {
            const { option, label, multiselect } = this.$attrs;

            if (multiselect) {
                this.setOptions({ label, option });
            } else {
                this.setOption({ label, option });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
    .tree-select__item {
        display: block !important;
        height: auto !important;
        padding: 0 !important;
        box-sizing: border-box;

        &.element--selected {
            background-color: unset;
            box-shadow: none !important;

            &:hover {
                background-color: unset;
                box-shadow: none !important;
            }

            & > .item__content {
                background-color: $GREEN_LIGHT;
                box-shadow: none;

                &:hover {
                    background-color: $GREEN_LIGHT;
                    box-shadow: none;
                }
            }
        }

        &:not(.element--selected) {
            &:hover {
                background-color: unset;
                box-shadow: none !important;
            }

            & > .item__content {
                &:hover {
                    background-color: $WHITESMOKE;
                }
            }
        }

        & > .item__list {
            margin-left: 24px;
            box-sizing: border-box;
            overflow: unset !important;

            &::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 100%;
                border-left: 1px solid $GREY;
                content: "";
            }
        }

        & > .item__content {
            display: flex;
            height: 40px;
            padding-left: 9px;
            box-sizing: border-box;
        }
    }
</style>
