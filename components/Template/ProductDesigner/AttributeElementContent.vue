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
            <Component :is="attributeIconComponent" />
        </div>
        <div class="vertical-wrapper">
            <span
                :class="[typeLabelClasses, typeLabelRequireClass]"
                v-text="element.type" />
            <span
                class="element-content__subheader txt--dark-graphite typo-subtitle"
                v-text="element.label || 'No translation'" />
        </div>
        <div
            v-if="!disabled"
            :class="['element-content__contextual-menu', contextualMenuHoveStateClasses]">
            <ButtonSelect
                icon-path="Others/IconDots"
                :options="contextualMenuItems"
                @focus="onSelectFocus">
                <template #content>
                    <List>
                        <ListElement
                            v-for="(option, optIndex) in contextualMenuItems"
                            :key="option"
                            @click.native="() => onSelectValue(optIndex)">
                            <ListElementDescription>
                                <ListElementTitle :title="option" />
                            </ListElementDescription>
                            <CheckBox
                                v-if="option === 'Required'"
                                ref="checkbox"
                                :value="element.required" />
                        </ListElement>
                    </List>
                </template>
            </ButtonSelect>
        </div>
    </ElementContentBase>
</template>

<script>
import { mapActions } from 'vuex';
import { capitalizeAndConcatenationArray } from '~/model/stringWrapper';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';
import CheckBox from '~/components/Inputs/CheckBox';
import ElementContentBase from '~/components/Template/ProductDesigner/ElementContentBase';
import List from '~/components/List/List';
import ListElement from '~/components/List/ListElement';
import ListElementDescription from '~/components/List/ListElementDescription';
import ListElementTitle from '~/components/List/ListElementTitle';

export default {
    name: 'AttributeElementContent',
    components: {
        ListElementTitle,
        ButtonSelect,
        ElementContentBase,
        List,
        ListElement,
        ListElementDescription,
        CheckBox,
    },
    props: {
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
            isContextualMenuActive: false,
            contextualMenuItems: ['Required', 'Remove'],
            isHovered: false,
        };
    },
    computed: {
        typeLabelRequireClass() {
            return { 'element-content--required': this.element.required };
        },
        typeLabelClasses() {
            return [
                'element-content__header',
                'txt--light-graphite',
                'typo-label',
                'l-spacing--half',
            ];
        },
        attributeIconComponent() {
            if (!this.element.type) return '';

            const types = this.element.type.split('_');
            const attributeName = capitalizeAndConcatenationArray(types);

            return () => import(`~/components/Icon/Attributes/Icon${attributeName}`);
        },
        contextualMenuHoveStateClasses() {
            return { 'element-content__contextual-menu--hovered': this.isHovered };
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setLayoutElementRequirement',
            'removeLayoutElementAtIndex',
        ]),
        onSelectFocus(isFocused) {
            if (!isFocused) this.isHovered = false;

            this.isContextualMenuActive = isFocused;
        },
        onSelectValue(index) {
            switch (this.contextualMenuItems[index]) {
            case 'Required':
                this.setLayoutElementRequirement({
                    index: this.index,
                    required: !this.element.required,
                });
                break;
            case 'Remove':
                this.removeLayoutElementAtIndex(this.index);
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

        &__subheader {
            height: 20px;
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

        &--required::after {
            position: absolute;
            color: $error;
            content: "*";
        }
    }
</style>
