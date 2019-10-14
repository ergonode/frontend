/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Arrow } from '~/model/icons/Arrow';

export default {
    data() {
        return {
            selectBoundingBox: null,
            isFocused: false,
            isMounted: false,
            isMenuActive: false,
            isClickedOutside: false,
            hasMouseDown: false,
            associatedLabel: '',
        };
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }

        this.isMounted = true;
        this.associatedLabel = `input-${this._uid}`;
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    watch: {
        isMenuActive() {
            if (this.isMenuActive) {
                this.selectBoundingBox = this.getSelectBoundingBox();
                window.addEventListener('click', this.onClickOutside);
            } else {
                window.removeEventListener('click', this.onClickOutside);
            }
        },
    },
    computed: {
        dropDownState() {
            return this.isFocused
                ? Arrow.UP
                : Arrow.DOWN;
        },
        isEmpty() {
            return this.value === '' || this.value === null || this.value.length === 0;
        },
        isFloatingLabel() {
            return this.label !== null;
        },
        isPlaceholder() {
            return this.placeholder !== null;
        },
        inputClasses() {
            return [
                'input',
                {
                    solid: this.solid,
                    underline: this.underline,
                    'left-alignment': this.leftAlignment,
                    'center-alignment': this.centerAlignment,
                    'floating-label': this.isFloatingLabel,
                    'input--error': this.isError,
                    'input--focused': this.isFocused,
                    'input--disabled': this.disabled,
                },
            ];
        },
        activatorClasses() {
            return [
                'input__activator',
                {
                    'input__activator--small': this.small,
                    'input__activator--regular': this.regular,
                },
            ];
        },
        informationLabelClasses() {
            const colorClass = this.isError
                ? 'txt--error'
                : 'txt--graphite';

            return [
                'input__information-label',
                'typo-hint',
                colorClass,
            ];
        },
        floatingLabelTransforms() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmpty || this.isPlaceholder) {
                const { activator } = this.$refs;
                const translateX = this.solid ? '-2px' : '-5px';
                const transform = `translate(${translateX}, -${activator.offsetHeight / 2}px) scale(0.9)`;

                return {
                    transform,
                };
            }

            return {
                transform: 'translate(0, 0) scale(1)',
            };
        },
        floatingLabelClasses() {
            return [
                'input__label',
                { 'input__label--required': this.required },
            ];
        },
        informationLabel() {
            return this.isError ? this.parsedErrorMessages : this.hint;
        },
        isError() {
            return Boolean(Array.isArray(this.errorMessages)
                ? this.errorMessages.length
                : this.errorMessages);
        },
        parsedErrorMessages() {
            return Array.isArray(this.errorMessages)
                ? this.errorMessages.join(', ')
                : this.errorMessages;
        },
    },
    methods: {
        onClear() {
            this.$emit('input', this.multiselect ? [] : '');
        },
        onSelectValue(value) {
            this.$emit('input', value);
        },
        onDismiss() {
            this.isClickedOutside = true;

            this.onBlur();
        },
        onValueChange(event) {
            this.$emit('input', event.target.value);
        },
        onFocus() {
            this.isFocused = true;
            this.hasMouseDown = false;
            this.isMenuActive = true;

            this.$emit('focus', true);
        },
        onBlur() {
            if (this.isClickedOutside) {
                this.isFocused = false;
                this.isMenuActive = false;

                this.$emit('focus', false);
            }
        },
        onMouseDown(event) {
            const isClickedInInput = event.target === this.$refs.input;

            if (!isClickedInInput) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.hasMouseDown = true;
        },
        onMouseUp(event) {
            const isClickedInInput = event.target === this.$refs.input;
            const isDblClicked = event.detail > 1;

            if (isDblClicked) return;

            if (this.dismissible) {
                if (isClickedInInput) {
                    if (this.isFocused && this.hasMouseDown) {
                        this.isClickedOutside = true;
                        this.$refs.input.blur();
                    }
                } else if (!this.isFocused) {
                    this.$refs.input.focus();
                } else {
                    this.isClickedOutside = true;
                    this.$refs.input.blur();
                }
            } else if (!isClickedInInput) {
                this.$refs.input.focus();
            }

            this.hasMouseDown = false;
        },
        onClickOutside(event) {
            const isClickedInsideMenu = this.$refs.menu.$el.contains(event.target);

            this.isClickedOutside = !isClickedInsideMenu
                && !this.$refs.activator.contains(event.target);

            if (this.isClickedOutside
                || (isClickedInsideMenu && !this.multiselect && this.dismissible)) {
                this.isFocused = false;
                this.isMenuActive = false;

                this.$emit('focus', false);
            }
        },
        getSelectBoundingBox() {
            const {
                x,
                y,
                height,
                width,
            } = this.$el.getBoundingClientRect();
            const { innerHeight } = window;
            const maxHeight = 200;

            const position = { left: `${x}px` };

            if (this.fixedContentWidth) {
                position.width = `${width}px`;
            }

            if (innerHeight - y < maxHeight) {
                const offsetBottom = innerHeight - y;

                position.bottom = `${offsetBottom + 1}px`;

                return position;
            }

            position.top = `${y + height + 2}px`;

            return position;
        },
    },
};
