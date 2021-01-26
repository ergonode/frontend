/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
export default {
    name: 'FeedbackProvider',
    props: {
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        changeValuesKeys() {
            return Object.keys(this.changeValues);
        },
        hasValueToSave() {
            return this.changeValuesKeys.length > 0 && !this.changeValues.saved;
        },
        hasSuccess() {
            return this.changeValues.saved;
        },
        hasError() {
            return Object.keys(this.errors).length > 0;
        },
    },
    render() {
        return this.$scopedSlots.default({
            hasValueToSave: this.hasValueToSave,
            hasSuccess: this.hasSuccess,
            hasError: this.hasError,
        });
    },
};
</script>
