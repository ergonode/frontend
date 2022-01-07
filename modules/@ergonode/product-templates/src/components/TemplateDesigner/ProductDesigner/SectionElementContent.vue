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
            <IconFontSize />
        </div>
        <div class="vertical-wrapper">
            <span
                class="element-content__header"
                v-text="element.label" />
            <span
                class="element-content__subheader"
                v-text="getTypeTranslation(element.type)" />
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
import IconFontSize from '@UI/components/Icons/Editor/IconFontSize';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SectionElementContent',
    components: {
        IconFontSize,
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
        disabled: {
            type: Boolean,
            required: true,
        },
        element: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isContextualMenuActive: false,
            contextualMenuItems: [
                'Edit title',
                'Remove',
            ],
            isHovered: false,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'types',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        contextualMenuHoveStateClasses() {
            return {
                'element-content__contextual-menu--hovered': this.isHovered,
            };
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            'removeLayoutElementAtIndex',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(value) {
            switch (value) {
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
            case 'Edit title':
                this.$emit('edit-title', this.index);
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
        getTypeTranslation(key) {
            if (this.$te(`@Templates.productTemplate._.types.${key}`)) {
                return this.$t(`@Templates.productTemplate._.types.${key}`);
            }

            return this.types.find(type => type.variant === 'ui' && type.type === key).label;
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
            word-break: break-all;
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
    }
</style>
