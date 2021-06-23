/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    hasAnyChange,
} from '@Core/models/mappers/feedbackMapper';
import {
    mapState,
} from 'vuex';

export default {
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
    },
    methods: {
        confirmModal({
            confirmCallback = () => {},
            proceedCallback = () => {},
        }) {
            if (hasAnyChange({
                changeValues: this.changeValues,
                errors: this.errors,
            })) {
                this.$confirm({
                    type: MODAL_TYPE.POSITIVE,
                    title: 'Are you sure you want to leave page without saving the data?',
                    applyTitle: 'YES, I\'M SURE',
                    action: () => {
                        confirmCallback();
                    },
                });
            } else {
                proceedCallback();
            }
        },
    },
};
