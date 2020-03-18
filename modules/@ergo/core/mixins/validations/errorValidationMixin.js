/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';

export default {
    destroyed() {
        this.removeValidationErrors();
    },
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
        getValidationErrorForKey(key) {
            return this.validationErrors[key] || null;
        },
    },
};
