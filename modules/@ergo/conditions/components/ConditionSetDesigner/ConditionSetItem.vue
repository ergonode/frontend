/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="condition"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut">
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
                <ActionIconButton
                    :class="['condition__contextual-menu', contextualMenuHoveStateClasses]"
                    :theme="secondaryTheme"
                    :size="tinySize"
                    :options="contextualMenuItems"
                    @focus="onSelectFocus"
                    @input="onSelectValue">
                    <template #icon="{ color }">
                        <IconDots :fill-color="color" />
                    </template>
                </ActionIconButton>
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
import { SIZE, THEME } from '@Core/defaults/theme';
import { isEmpty } from '@Core/models/objectWrapper';
import { hasOptions } from '@Conditions/models/conditionTypes';
import ConditionSetParameters from '@Conditions/components/ConditionSetDesigner/ConditionSetParameters';
import ActionIconButton from '@Core/components/Buttons/ActionIconButton';
import IconDots from '@Core/components/Icons/Others/IconDots';

export default {
    name: 'ConditionSetItem',
    components: {
        ConditionSetParameters,
        ActionIconButton,
        IconDots,
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
            isContextualMenuActive: false,
            isHovered: false,
        };
    },
    computed: {
        ...mapState('conditions', {
            conditionsValues: state => state.conditionsValues,
        }),
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
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
        contextualMenuHoveStateClasses() {
            return { 'condition__contextual-menu--hovered': this.isHovered };
        },
    },
    methods: {
        onSelectValue(value) {
            switch (value) {
            case 'Remove':
                this.$emit('remove', this.itemRow, this.itemId);
                break;
            default: break;
            }
        },
        replacePlaceholderOnPhrase(placeholders) {
            const { phrase, parameters } = this.condition;
            const findKeyWhenSelect = clearedKey => parameters.findIndex(
                parameter => parameter.name === clearedKey
                && hasOptions(parameter.type),
            );

            return phrase.replace(/\[\w+\]/g, (placeholder) => {
                const clearedKey = placeholder.slice(1).slice(0, -1);
                const foundKey = findKeyWhenSelect(clearedKey);

                if (foundKey !== -1) {
                    if (!placeholders[clearedKey]) {
                        return placeholder;
                    }
                    if (Array.isArray(placeholders[clearedKey])) {
                        return placeholders[clearedKey].map(option => option.value).join(', ');
                    }
                    return placeholders[clearedKey].value;
                }
                return placeholders[clearedKey] || placeholder;
            });
        },
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onMouseOver() {
            if (!this.isHovered) this.isHovered = true;
        },
        onMouseOut() {
            if (!this.isContextualMenuActive) this.isHovered = false;
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
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
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

        &__contextual-menu {
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }

        &:hover {
            border-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;
        }
    }

    .container {
        display: flex;
        justify-content: space-between;
        margin-right: -8px;
    }
</style>
