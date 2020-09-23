/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapState,
} from 'vuex';

export default {
    beforeRouteLeave(to, from, next) {
        const hasError = Object.keys(this.errors).length > 0;
        const hasChange = Object.keys(this.changeValues).length > 0;

        if (hasError || hasChange) {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                applyTitle: 'YES, I AM',
                message: 'Are you sure you want to leave page without saving the data?',
                confirmCallback: () => {
                    next();
                },
            });
        } else {
            next();
        }
    },
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
    },
};
