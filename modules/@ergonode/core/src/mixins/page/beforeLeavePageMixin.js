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
        const changeValuesKeys = Object.keys(this.changeValues);
        const hasError = Object.keys(this.errors).length > 0;
        const hasChange = changeValuesKeys.length > 0
            && changeValuesKeys.some(key => Object.keys(this.changeValues[key]).length > 0
                && !this.changeValues[key].saved);

        if (hasError || hasChange) {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                applyTitle: 'YES, I\'M SURE',
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
