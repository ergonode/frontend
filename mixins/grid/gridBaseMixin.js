/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    components: {
        ResponsiveCenteredViewTemplate,
        Grid: () => import('@Core/components/Grid/Grid'),
        GridPageSelector: () => import('@Core/components/Grid/GridPageSelector'),
        GridPagination: () => import('@Core/components/Grid/GridPagination'),
    },
};
