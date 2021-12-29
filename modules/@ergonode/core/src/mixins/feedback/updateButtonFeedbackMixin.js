/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    mapActions,
} from 'vuex';

export default {
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        /**
         * The validation errors
         */
        errors: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Values that have been changes at given context
         */
        changeValues: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
            'markChangeValuesAsSaved',
        ]),
    },
};
