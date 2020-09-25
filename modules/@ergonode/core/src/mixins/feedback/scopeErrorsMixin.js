/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    toLowerCaseFirstLetter,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    computed: {
        ...mapState('feedback', [
            'errors',
        ]),
        scope() {
            return toLowerCaseFirstLetter(this.$options.name);
        },
        scopeErrors() {
            return this.errors[this.scope] || {};
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
        ]),
    },
};
