/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    components: {
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        ErrorHint: () => import('@Core/components/Hints/ErrorHint'),
    },
    data() {
        return {
            isFocused: false,
            isMouseMoving: false,
            associatedLabel: '',
        };
    },
    mounted() {
        if (this.autofocus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }

        this.associatedLabel = `input-${this._uid}`;
    },
    computed: {
        isAppendSlotVisible() {
            return this.isError || this.isDescription || !!this.$slots.append;
        },
        isEmpty() {
            return this.value === '' || this.value === null;
        },
        isDescription() {
            return this.description !== '' && this.description !== null;
        },
        isError() {
            return Boolean(this.errorMessages);
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
                    'floating-label': Boolean(this.label) && this.label.length > 0,
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
            if (this.isFocused || !this.isEmpty) {
                return {
                    transform: 'translateY(-100%) scale(0.8)',
                };
            }

            return null;
        },
        floatingLabelClasses() {
            return [
                'input__label',
                { 'input__label--required': this.required },
            ];
        },
        informationLabel() {
            return this.errorMessages || this.hint;
        },
        placeholderValue() {
            if (!this.value && this.label && !this.isFocused) return null;

            return !this.value ? this.placeholder : null;
        },
    },
    methods: {
        onValueChange(event) {
            this.$emit('input', event.target.value);
        },
        onFocus() {
            this.isFocused = true;

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
        },
        onMouseUp() {
            this.$refs.activator.removeEventListener('mousemove', this.onMouseMove);

            // Manual handling of input focus
            if (!this.isMouseMoving) {
                this.$refs.input.focus();
            }
        },
        onMouseMove() {
            this.isMouseMoving = true;
        },
    },
};
