/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<script>
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'FormValidatorField',
    props: {
        fieldKey: {
            type: [
                Array,
                String,
                Number,
            ],
            required: true,
        },
    },
    computed: {
        ...mapState('feedback', [
            'errors',
        ]),
        errorMessages() {
            if (Array.isArray(this.fieldKey)) {
                let errors = null;

                this.fieldKey.forEach((key) => {
                    if (!errors && this.errors[key]) {
                        errors = this.errors[key];
                    } else if (errors && errors[key]) {
                        errors = errors[key];
                    } else {
                        errors = null;
                    }
                });

                return errors;
            }

            return this.errors[this.fieldKey];
        },
    },
    beforeDestroy() {
        this.removeError(this.fieldKey);
    },
    methods: {
        ...mapActions('feedback', [
            'removeError',
        ]),
    },
    render() {
        return this.$scopedSlots.validator({
            errorMessages: this.errorMessages,
        });
    },
};
</script>
