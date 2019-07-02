/*
* Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
* See LICENSE for license details.
*/
<template>
    <ElementContentBase
        @mouseover.native="onMouseOver"
        @mouseout.native="onMouseOut">
        <div class="element-content__icon">
            <Icon
                size="medium"
                :icon="iconByType" />
        </div>
        <div class="vertical-wrapper">
            <span
                :class="[typeLabelClasses, typeLabelRequireClass]"
                v-text="element.type" />
            <span
                class="txt--dark-graphite typo-subtitle txt-fixed "
                v-text="element.label || 'No translation'" />
        </div>
        <div :class="['element-content__contextual-menu', contextualMenuHoveStateClasses]">
            <ButtonSelect
                :icon="contextualMenuStateIcon"
                :options="contextualMenuItems"
                @focus="onSelectFocus">
                <template v-slot:content>
                    <List>
                        <ListElement
                            v-for="(option, optIndex) in contextualMenuItems"
                            :key="option"
                            regular
                            @click.native="() => onSelectValue(optIndex)">
                            <ListElementDescription
                                :subtitle="option"
                                subtitle-color="txt--graphite" />
                            <CheckBox
                                v-if="option === 'Require'"
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
import Icon from '~/components/Icon/Icon';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';
import CheckBox from '~/components/Inputs/CheckBox';
import ElementContentBase from '~/components/Template/TemplateDesigner/ElementContentBase';
import List from '~/components/List/List';
import ListElement from '~/components/List/ListElement';
import ListElementDescription from '~/components/List/ListElementDescription';

export default {
    name: 'AttributeElementContent',
    components: {
        Icon,
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
    },
    data() {
        return {
            isContextualMenuActive: false,
            contextualMenuItems: ['Require', 'Remove'],
            isHovered: false,
        };
    },
    computed: {
        typeLabelRequireClass() {
            return { 'element-content--required': this.element.required };
        },
        typeLabelClasses() {
            return [
                'txt--light-graphite',
                'typo-label',
                'l-spacing--half',
                'txt-fixed',
            ];
        },
        iconByType() {
            const { type } = this.element;
            const convertedType = type.toLowerCase().replace('_', '-');

            return `attribute-${convertedType}`;
        },
        contextualMenuHoveStateClasses() {
            return { 'element-content__contextual-menu--hovered': this.isHovered };
        },
        contextualMenuStateIcon() {
            return this.isContextualMenuActive
                ? 'sprite-system system-dots--selected'
                : 'sprite-system system-dots--deactive';
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
            case 'Require':
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
