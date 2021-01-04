/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DesignerItem
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
                class="condition-set-tree-designer-item">
                <ConditionSetTreeDesignerItemDescription
                    :title="condition.name"
                    :subtitle="conditionPhrase" />
                <div
                    :style="parametersStyle"
                    class="condition-set-tree-designer-item__parameters">
                    <ConditionSetTreeDesignerItemParameters
                        v-for="(parameter, index) in condition.parameters"
                        :key="index"
                        :parameter="parameter"
                        :item-id="item.id"
                        :item-row="item.row"
                        :scope="scope"
                        :error-messages="errors[parameter.name]"
                        :disabled="disabled" />
                </div>
            </div>
        </template>
    </DesignerItem>
</template>
<script>
import ConditionSetTreeDesignerItemDescription
    from '@Conditions/components/TreeDesigners/ConditionSetTreeDesignerItemDescription';
import ConditionSetTreeDesignerItemParameters from '@Conditions/components/TreeDesigners/ConditionSetTreeDesignerItemParameters';
import {
    hasOptions,
} from '@Conditions/models/conditionTypes';
import DesignerItem from '@UI/components/Designer/DesignerItem';
import Preloader from '@UI/components/Preloader/Preloader';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesignerItem',
    components: {
        ConditionSetTreeDesignerItemDescription,
        Preloader,
        ConditionSetTreeDesignerItemParameters,
        DesignerItem,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        condition: {
            type: Object,
            default: () => ({}),
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
    },
    async fetch() {
        console.log('fetching', this.item.type);
        if (typeof this.conditions[this.item.type] === 'undefined') {
            this.isPrefetchingData = true;

            await this.getCondition({
                id: this.item.type,
                onSuccess: this.getConditionSuccess,
                onError: this.getConditionError,
            });
        }
    },
    data() {
        return {
            isPrefetchingData: false,
        };
    },
    computed: {
        ...mapState('condition', [
            'conditionsValues',
            'conditions',
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
        parametersStyle() {
            const {
                parameters,
            } = this.condition;
            return {
                gridTemplateColumns: `repeat(${parameters.length}, minmax(max-content, 33%))`,
            };
        },
    },
    methods: {
        ...mapActions('condition', [
            'getCondition',
        ]),
        getConditionSuccess() {
            this.isPrefetchingData = false;
        },
        getConditionError() {
            this.isPrefetchingData = false;
        },
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
        display: flex;
        flex: 1;
        flex-direction: column;

        &::after {
            position: absolute;
            left: 50%;
            bottom: -8px;
            padding: 0 8px;
            transform: translateX(-50%);
            background-image: linear-gradient($WHITESMOKE, $WHITE);
            color: $GRAPHITE_DARK;
            font: $FONT_SEMI_BOLD_10_12;
            content: "AND";
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
</style>
