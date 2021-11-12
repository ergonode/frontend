/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    OPTION_STATES,
} from '@Attributes/defaults';

export default {
    deletedOptionsIds: state => Object.keys(state.optionsState)
        .filter(key => OPTION_STATES.DELETE in state.optionsState[key])
        .map(key => ({
            optionId: state.optionsState[key][OPTION_STATES.DELETE],
            keyField: key,
        })),
};
