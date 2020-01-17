/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';
import { isEmpty } from '~/model/objectWrapper';

export default {
    destroyed() {
        this.removeValidationErrors();
    },
    computed: {
        ...mapState('validations', {
            validationErrors: (state) => state.validationErrors,
        }),
        validationErrorsAreNotNull() {
            return !isEmpty(this.validationErrors);
        },
    },
    methods: {
        ...mapActions('validations', [
            'removeValidationErrors',
        ]),
        validationErrorsHasProperty(property) {
            return this.validationErrors[property];
        },
        elementIsValidate(index) {
            return this.validationErrorsAreNotNull
            && this.validationErrorsHasProperty(index)
                ? this.validationErrors[index].join(', ') : null;
        },
    },
};
