/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';
import { isEmpty } from '@Core/models/objectWrapper';

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
        elementIsValidate(index) {
            return !isEmpty(this.validationErrors)
            && this.validationErrors[index]
                ? this.validationErrors[index].join(', ') : null;
        },
    },
};
