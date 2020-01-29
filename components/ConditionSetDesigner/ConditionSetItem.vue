/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="condition">
        <template v-if="isCondition">
            <div class="container">
                <div class="condition__description">
                    <span
                        class="condition__title"
                        v-text="condition.name" />
                    <span
                        class="condition__phrase"
                        v-text="conditionPhrase" />
                </div>
                <MenuButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    :plain="true">
                    <template #icon="{ fillColor }">
                        <IconDots :fill-color="fillColor" />
                    </template>
                    <template #content>
                        <List>
                            <ListElement
                                v-for="(option, optIndex) in contextualMenuItems"
                                :key="option"
                                :small="true"
                                @click.native.prevent="onSelectValue(optIndex)">
                                <ListElementDescription>
                                    <ListElementTitle :title="option" />
                                </ListElementDescription>
                                <ListElementAction>
                                    <CheckBox
                                        v-if="option === 'Required'"
                                        ref="checkbox"
                                        :value="element.required" />
                                </ListElementAction>
                            </ListElement>
                        </List>
                    </template>
                </MenuButton>
            </div>
            <div
                class="condition__parameters"
                :style="parametersStyle">
                <ConditionSetParameters
                    v-for="(parameter, index) in condition.parameters"
                    :key="index"
                    :parameter="parameter"
                    :item-id="itemId"
                    :item-row="itemRow" />
            </div>
        </template>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import {
    isEmpty,
} from '~/model/objectWrapper';
import { hasOptions } from '~/model/attributes/AttributeTypes';
import ConditionSetParameters from '~/components/ConditionSetDesigner/ConditionSetParameters';
import List from '~/core/components/List/List';
import ListElement from '~/core/components/List/ListElement';
import ListElementAction from '~/core/components/List/ListElementAction';
import ListElementDescription from '~/core/components/List/ListElementDescription';
import ListElementTitle from '~/core/components/List/ListElementTitle';
import MenuButton from '~/core/components/Buttons/MenuButton';
import IconDots from '~/components/Icon/Others/IconDots';

export default {
    name: 'ConditionSetItem',
    components: {
        ConditionSetParameters,
        MenuButton,
        IconDots,
        List,
        ListElement,
        ListElementAction,
        ListElementTitle,
        ListElementDescription,
    },
    props: {
        condition: {
            type: Object,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        itemRow: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            contextualMenuItems: ['Remove'],
        };
    },
    computed: {
        ...mapState('conditions', {
            conditionsValues: (state) => state.conditionsValues,
        }),
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isCondition() {
            return !isEmpty(this.condition);
        },
        conditionPhrase() {
            const { phrase } = this.condition;
            const placeholders = this.conditionsValues[this.itemId];

            if (!placeholders) return phrase;
            return this.replacePlaceholderOnPhrase(placeholders);
        },
        parametersStyle() {
            const { parameters } = this.condition;
            return {
                gridTemplateColumns: `repeat(${parameters.length}, minmax(max-content, 33%))`,
            };
        },
    },
    methods: {
        onSelectValue(index) {
            switch (this.contextualMenuItems[index]) {
            case 'Remove':
                this.$emit('remove', this.itemId);
                break;
            default: break;
            }
        },
        replacePlaceholderOnPhrase(placeholders) {
            const { phrase, parameters } = this.condition;
            const findKeyWhenSelect = (clearedKey) => parameters.findIndex(
                (parameter) => parameter.name === clearedKey
                && hasOptions(parameter.type),
            );

            return phrase.replace(/\[\w+\]/g, (placeholder) => {
                const clearedKey = placeholder.slice(1).slice(0, -1);
                const foundKey = findKeyWhenSelect(clearedKey);

                if (foundKey !== -1) {
                    if (!placeholders[clearedKey]) return placeholder;
                    return placeholders[clearedKey].value;
                }
                return placeholders[clearedKey] || placeholder;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .condition {
        display: flex;
        flex-direction: column;
        border: 1px solid $GREY;
        padding: 16px;
        box-sizing: border-box;
        background-color: $WHITESMOKE;
        cursor: grab;
        overflow: hidden;

        &::after {
            position: absolute;
            left: 50%;
            bottom: -8px;
            padding: 0 8px;
            transform: translateX(-50%);
            background-color: $WHITE;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
            content: "AND";
        }

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
            margin-bottom: 4px;
        }

        &__phrase {
            color: $GRAPHITE_LIGHT;
            font: $FONT_MEDIUM_12_16;
        }

        &__parameters {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 16px;
            margin-top: 12px;
        }

        &__description {
            display: flex;
            flex-direction: column;
        }
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
