/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ElementContentBase
        :disabled="disabled"
        @mouseover.native="onMouseOver"
        @mouseout.native="onMouseOut">
        <div class="element-content__icon">
            <IconFontSize />
        </div>
        <div class="vertical-wrapper">
            <span
                :class="typeLabelClasses"
                v-text="element.type" />
            <span
                class="element-content__subheader font--medium-14-20"
                v-text="element.label" />
        </div>
        <div
            v-if="!disabled"
            :class="['element-content__contextual-menu', contextualMenuHoveStateClasses]">
            <MenuButton
                :theme="secondaryTheme"
                :size="smallSize"
                :plain="true"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus">
                <template #icon="{ fillColor }">
                    <IconDots :fill-color="fillColor" />
                </template>
            </MenuButton>
        </div>
    </ElementContentBase>
</template>

<script>
import { mapActions } from 'vuex';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import ElementContentBase from '~/components/Template/ProductDesigner/ElementContentBase';
import IconFontSize from '~/components/Icon/Editor/IconFontSize';
import MenuButton from '@Core/components/Buttons/MenuButton';
import IconDots from '~/components/Icon/Others/IconDots';

export default {
    name: 'SectionElementContent',
    components: {
        IconFontSize,
        MenuButton,
        IconDots,
        ElementContentBase,
    },
    props: {
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
            contextualMenuItems: ['Edit title', 'Remove'],
            isHovered: false,
        };
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        contextualMenuHoveStateClasses() {
            return { 'element-content__contextual-menu--hovered': this.isHovered };
        },
        typeLabelClasses() {
            return [
                'element-content__header',
                'txt--light-graphite',
                'font--semi-bold-12-16',
            ];
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'removeLayoutElementAtIndex',
        ]),
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(value) {
            switch (value) {
            case 'Remove':
                this.removeLayoutElementAtIndex(this.index);
                break;
            case 'Edit title':
                this.$emit('editTitle', this.index);
                break;
            default: break;
            }
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
    .element-content {
        .vertical-wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 6px 8px;
        }

        &__icon {
            display: flex;
            padding-top: 12px;
        }

        &__header {
            letter-spacing: 0.5px;
        }

        &__subheader {
            height: 20px;
            color: $GRAPHITE_DARK;
        }

        &__header, &__subheader {
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }

        &__contextual-menu {
            flex: 0;
            align-items: flex-start;
            padding: 12px 0;
            opacity: 0;

            &--hovered {
                opacity: 1;
            }
        }
    }
</style>
