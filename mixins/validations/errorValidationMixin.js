/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState } from 'vuex';
import { isEmpty } from '~/model/objectWrapper';

export default {
    computed: {
        ...mapState('validations', {
            validationErrors: state => state.validationErrors,
        }),
        validationErrorsAreNotNull() {
            return !isEmpty(this.validationErrors);
        },
    },
    methods: {
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
