/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="section-container"
        :style="gridItemPosition">
        <div
            v-show="!layoutElement.isObstacle"
            :class="
                [
                    'section-container__section',
                    { 'section-container__section--focused': sectionHasContent || isInputFocused }
                ]">
            <div
                :class="
                    [
                        'section-container__section__line',
                        { 'section-container__section__line--focused': isInputFocused }
                    ]" />
            <input
                v-model="title"
                v-autowidth="autoWidthClass"
                :maxlength="maxSectionLength"
                type="'text"
                :class="
                    [
                        'section-container__section__input',
                        { 'section-container__section__input--focused': isInputFocused }
                    ]"
                placeholder="CLICK TO ADD SECTION"
                @drop="disabledDrop"
                @focus="onInputFocus"
                @blur="onInputFocusOut">
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import gridElementOptionsMixin from '~/mixins/gridElementOptionsMixin';

export default {
    name: 'TemplateGridSection',
    mixins: [gridElementOptionsMixin],
    data: () => ({
        isMouseOver: false,
        autoWidthClass: {
            maxWidth: '100%',
            minWidth: '25px',
            comfortZone: '0',
        },
        isInputFocused: false,
        maxSectionLength: 32,
    }),
    computed: {
        ...mapState('templateDesigner', {
            section: state => state.section,
        }),
        title: {
            get() {
                return this.layoutElement.label;
            },
            set(value) {
                const { xPos, yPos } = this.layoutElement.coordinates;
                this.$store.dispatch('templateDesigner/setTemplateDesignerSectionTitle', {
                    row: yPos.start,
                    column: xPos.start,
                    title: value,
                });
            },
        },
        sectionHasContent() {
            return this.title !== '';
        },
    },
    methods: {
        ...mapActions('templateDesigner', [
            'setTemplateDesignerSectionTitle',
        ]),
        disabledDrop(event) {
            event.preventDefault();
            return false;
        },
        onInputFocus() {
            this.isInputFocused = true;
        },
        onInputFocusOut() {
            this.isInputFocused = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .section-container {
        height: 21px;

        &__section {
            position: relative;
            display: flex;
            justify-content: left;
            align-items: center;
            height: 21px;
            transition: opacity 0.2s ease-out;
            opacity: 0;

            &:hover {
                opacity: 1;
            }

            &--focused {
                opacity: 1;
            }

            &__line {
                position: absolute;
                width: 100%;
                border: 0.5px solid $grey;
                box-sizing: border-box;
            }

            &__line--focused {
                border: 0.5px solid $darkGrey;
            }

            &__input {
                @include setFont(medium, tiny, regular, $lightGraphite, 0.83);
                z-index: 1;
                padding: 0 10px;
                margin: 0 40px;
                background-color: $background;
                font-display: swap;
                outline-style: none;
            }

            &__input--focused {
                background-color: $white;
                box-shadow: inset 0 0 0 1px $darkGrey;
                color: $darkGrey;
                border-radius: 3px;
            }
        }
    }
</style>
