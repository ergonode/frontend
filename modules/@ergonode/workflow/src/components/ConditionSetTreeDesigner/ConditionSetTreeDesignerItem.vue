/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DesignerItem
        class="condition-set-tree-designer-item"
        :row="item.row"
        :column="item.column"
        :gap="gap"
        :disabled="disabled"
        :menu-items="menuItems"
        :menu-position="{ top: '16px', right: '16px' }"
        @select-menu-option="onSelectValue">
        <template #body>
            <Preloader v-if="isPrefetchingData" />
            <div
                v-else
                class="condition-set-tree-designer-item__body">
                <ConditionSetTreeDesignerItemDescription
                    :title="condition.name"
                    :subtitle="conditionPhrase" />
                <ConditionSetTreeDesignerItemParameters :parameters="condition.parameters">
                    <template #parameter="{ index, parameter }">
                        <ConditionSetTreeDesignerItemParameter
                            :key="index"
                            :value="conditionsValues[item.id]"
                            :parameter="parameter"
                            :item-id="item.id"
                            :scope="scope"
                            :error-messages="errors[parameter.name]"
                            :disabled="disabled" />
                    </template>
                </ConditionSetTreeDesignerItemParameters>
            </div>
        </template>
    </DesignerItem>
</template>
<script>
import DesignerItem from '@UI/components/Designer/DesignerItem';
import ConditionSetTreeDesignerItemDescription
    from '@Workflow/components/ConditionSetTreeDesigner/ConditionSetTreeDesignerItemDescription';
import ConditionSetTreeDesignerItemParameter
    from '@Workflow/components/ConditionSetTreeDesigner/ConditionSetTreeDesignerItemParameter';
import ConditionSetTreeDesignerItemParameters
    from '@Workflow/components/ConditionSetTreeDesigner/ConditionSetTreeDesignerItemParameters';
import {
    hasOptions,
} from '@Workflow/models/conditionDesigner/conditionTypes';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesignerItem',
    components: {
        ConditionSetTreeDesignerItemParameter,
        ConditionSetTreeDesignerItemParameters,
        ConditionSetTreeDesignerItemDescription,
        DesignerItem,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        condition: {
            type: Object,
            default: null,
        },
        gap: {
            type: Number,
            default: 16,
        },
        scope: {
            type: String,
            default: '',
        },
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        isPrefetchingData: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('workflowConditions', [
            'conditionsValues',
        ]),
        menuItems() {
            return [
                'Remove',
            ];
        },
        conditionPhrase() {
            const {
                phrase,
            } = this.condition;
            const placeholders = this.conditionsValues[this.item.id];

            if (!placeholders) {
                return phrase;
            }

            return this.replacePlaceholderOnPhrase(placeholders);
        },
    },
    methods: {
        onSelectValue(value) {
            switch (value) {
            case 'Remove':
                this.$emit('remove', this.item);
                break;
            default: break;
            }
        },
        replacePlaceholderOnPhrase(placeholders) {
            const {
                phrase,
                parameters,
            } = this.condition;
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
    },
};
</script>

<style lang="scss" scoped>
    .condition-set-tree-designer-item {
        &__body {
            display: flex;
            flex: 1;
            flex-direction: column;
        }

        &::after {
            position: absolute;
            left: 50%;
            bottom: -24px;
            padding: 0 8px;
            transform: translateX(-50%);
            background-color: $WHITE;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_12_16;
            content: "AND";
        }
    }
</style>
