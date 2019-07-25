/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    elementDataByType: state => type => state.types.find(
        attributeType => attributeType.type === type,
    ),
};
