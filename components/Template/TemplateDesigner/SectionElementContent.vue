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
                icon="editor-font-size-24" />
        </div>
        <div class="vertical-wrapper">
            <span
                :class="typeLabelClasses"
                v-text="element.type" />
            <span
                class="txt--dark-graphite typo-subtitle txt-fixed "
                v-text="element.label" />
        </div>
        <div :class="['element-content__contextual-menu', contextualMenuHoveStateClasses]">
            <ButtonSelect
                :icon="contextualMenuStateIcon"
                :options="contextualMenuItems"
                @input="onSelectValue"
                @focus="onSelectFocus" />
        </div>
    </ElementContentBase>
</template>

<script>
import { mapActions } from 'vuex';
import ElementContentBase from '~/components/Template/TemplateDesigner/ElementContentBase';
import Icon from '~/components/Icon/Icon';
import ButtonSelect from '~/components/Inputs/Select/ButtonSelect';

export default {
    name: 'SectionElementContent',
    components: {
        Icon,
        ButtonSelect,
        ElementContentBase,
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
            contextualMenuItems: ['Edit title', 'Remove'],
            isHovered: false,
        };
    },
    computed: {
        contextualMenuHoveStateClasses() {
            return { 'element-content__contextual-menu--hovered': this.isHovered };
        },
        contextualMenuStateIcon() {
            return this.isContextualMenuActive
                ? 'sprite-system system-dots--selected'
                : 'sprite-system system-dots--deactive';
        },
        typeLabelClasses() {
            return [
                'txt--light-graphite',
                'typo-label',
                'l-spacing--half',
                'txt-fixed',
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
