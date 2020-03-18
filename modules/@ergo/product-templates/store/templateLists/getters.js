/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    sectionElementsByID: state => id => state.templatesSectionElements.filter(
        element => element.group_id === id,
    ),
};
