/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'FormValidatorField',
    props: {
        fieldKey: {
            type: [Array, String, Number],
            required: true,
        },
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        errorMessages() {
            if (Array.isArray(this.fieldKey)) {
                let validationError = null;

                this.fieldKey.forEach((key) => {
                    if (!validationError && this.validationErrors[key]) {
                        validationError = this.validationErrors[key];
                    } else if (validationError && validationError[key]) {
                        validationError = validationError[key];
                    } else {
                        validationError = null;
                    }
                });

                return validationError;
            }

            return this.validationErrors[this.fieldKey];
        },
    },
    beforeDestroy() {
        this.removeValidationError(this.fieldKey);
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationError',
        ]),
    },
    render() {
        return this.$scopedSlots.validator({
            errorMessages: this.errorMessages,
        });
    },
};
</script>
