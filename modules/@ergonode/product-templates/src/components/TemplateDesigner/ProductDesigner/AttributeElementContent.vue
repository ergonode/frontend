/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ElementContentBase
        :disabled="disabled"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave">
        <div class="element-content__icon">
            <template v-for="(formComponent, i) in typeIconComponent">
                <Component
                    :is="formComponent.component"
                    :key="i"
                    v-bind="formComponent.props" />
            </template>
        </div>
        <div class="vertical-wrapper">
            <span
                :class="['element-content__header', typeLabelRequireClass]"
                v-text="element.label" />
            <span
                class="element-content__subheader"
                v-text="attrTypes[element.type] || element.type" />
        </div>
        <div
            v-if="!disabled"
            :class="['element-content__contextual-menu', contextualMenuHoveStateClasses]">
            <ActionIconButton
                :theme="secondaryTheme"
                :size="smallSize"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus">
                <template #icon="{ color }">
                    <IconDots :fill-color="color" />
                </template>
                <template #option="{ option }">
                    <ListElementDescription>
                        <ListElementTitle
                            :title="option"
                            :size="smallSize" />
                    </ListElementDescription>
                    <ListElementAction :size="smallSize">
                        <CheckBox
                            v-if="option === 'Required'"
                            ref="checkbox"
                            :value="element.required" />
                    </ListElementAction>
                </template>
            </ActionIconButton>
        </div>
    </ElementContentBase>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import ElementContentBase from '@Templates/components/TemplateDesigner/ProductDesigner/ElementContentBase';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeElementContent',
    components: {
        ElementContentBase,
    },
    props: {
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
        index: {
            type: Number,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            contextualMenuItems: [
                'Required',
                'Remove',
            ],
            isContextualMenuActive: false,
            isHovered: false,
        };
    },
    computed: {
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        typeLabelRequireClass() {
            return {
                'element-content--required': this.element.required,
            };
        },
        typeIconComponent() {
            const icon = this.$extendedForm({
                key: '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent/icons',
                type: this.element.type,
            });

            if (!icon.length) {
                return [
                    {
                        component: () => import('@Attributes/components/Icons/IconAttributes'),
                    },
                ];
            }

            return icon;
        },
        contextualMenuHoveStateClasses() {
            return {
                'element-content__contextual-menu--hovered': this.isHovered,
            };
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            'updateLayoutElementAtIndex',
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(option) {
            switch (option) {
            case 'Required':
                this.updateLayoutElementAtIndex({
                    index: this.index,
                    element: {
                        ...this.element,
                        required: !this.element.required,
                    },
                });

                this.onScopeValueChange({
                    scope: this.scope,
                    fieldKey: 'templateDesigner',
                    value: true,
                });
                break;
            case 'Remove':
                this.removeLayoutElementAtIndex({
                    index: this.index,
                    scope: this.scope,
                });

                this.onScopeValueChange({
                    scope: this.scope,
                    fieldKey: 'templateDesigner',
                    value: true,
                });
                break;
            default: break;
            }
        },
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            if (!this.isContextualMenuActive) this.isHovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-content {
        .vertical-wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            padding: 6px 8px;
        }

        &__icon {
            display: flex;
            padding-top: 10px;
        }

        &__subheader {
            letter-spacing: 0.2px;
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_10_12;
        }

        &__header {
            height: 20px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }

        &__header, &__subheader {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__contextual-menu {
            flex: 0;
            align-items: flex-start;
            padding: 8px;
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }

        &--required::after {
            position: absolute;
            color: $RED;
            content: "*";
        }
    }
</style>
