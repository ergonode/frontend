/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        InfoHint: () => import('~/core/components/Inputs/Hint/InfoHint'),
        ErrorHint: () => import('~/core/components/Inputs/Hint/ErrorHint'),
    },
    data() {
        return {
            isFocused: false,
            isMounted: false,
            isMouseMoving: false,
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
    computed: {
        isAppendSlotVisible() {
            return this.isError || this.isDescription || !!this.$slots.append;
        },
        isEmpty() {
            return this.value === '' || this.value === null;
        },
        isFloatingLabel() {
            return this.label !== '' && this.label !== null;
        },
        isPlaceholder() {
            return this.placeholder !== '' && this.placeholder !== null;
        },
        isDescription() {
            return this.description !== '' && this.description !== null;
        },
        isError() {
            return Boolean(Array.isArray(this.errorMessages)
                ? this.errorMessages.length
                : this.errorMessages);
        },
        inputClasses() {
            return [
                'input',
                {
                    solid: this.solid,
                    underline: this.underline,
                    small: this.small,
                    regular: this.regular,
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
            ];
        },
        informationLabelClasses() {
            return [
                'input__information-label',
            ];
        },
        floatingLabelTransforms() {
            if (!this.isMounted) return null;

            if (this.isFocused || !this.isEmpty) {
                const isTextArea = this.$refs.input.type === 'textarea';
                const { activator } = this.$refs;
                const transformValue = isTextArea ? 18 : activator.offsetHeight / 2;
                const transform = `translateY(-${transformValue}px)`;

                return {
                    transform,
                };
            }

            return {
                transform: 'translateY(0)',
            };
        },
        floatingLabelClasses() {
            return [
                'input__label',
                this.isEmpty && !this.isFocused ? 'font--medium-14-20' : 'font--medium-12-16',
                { 'input__label--required': this.required },
            ];
        },
        informationLabel() {
            return this.isError ? this.parsedErrorMessages : this.hint;
        },
        parsedErrorMessages() {
            return Array.isArray(this.errorMessages)
                ? this.errorMessages.join(', ')
                : this.errorMessages;
        },
        placeholderValue() {
            return this.isFocused && !this.value ? this.placeholder : null;
        },
    },
    methods: {
        onValueChange(event) {
            this.$emit('input', event.target.value);
        },
        onFocus() {
            this.isFocused = true;
            this.hasMouseDown = false;

            this.$emit('focus', true);
        },
        onBlur() {
            this.isFocused = false;
            this.isMouseMoving = false;

            this.$emit('focus', false);
        },
        onMouseDown(event) {
            this.$refs.activator.addEventListener('mousemove', this.onMouseMove);

            const isClickedInsideInput = event.target === this.$refs.input;

            if (!isClickedInsideInput) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.hasMouseDown = true;
        },
        onMouseUp(event) {
            this.$refs.activator.removeEventListener('mousemove', this.onMouseMove);

            const isClickedInsideInput = event.target === this.$refs.input;
            const isDblClicked = event.detail > 1;

            if (isDblClicked || this.isMouseMoving) return;

            if (this.dismissible) {
                if (isClickedInsideInput) {
                    if (this.isFocused && this.hasMouseDown) this.$refs.input.blur();
                } else if (!this.isFocused) this.$refs.input.focus();
                else this.$refs.input.blur();
            } else if (!isClickedInsideInput) {
                this.$refs.input.focus();
            }

            this.hasMouseDown = false;
        },
        onMouseMove() {
            this.isMouseMoving = true;
        },
    },
};
