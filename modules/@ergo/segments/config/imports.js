/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Segments: () => import('@Segments/pages/segments/index').then((m) => m.default || m),
    SegmentNew: () => import('@Segments/pages/segments/_segment/index').then((m) => m.default || m),
    SegmentEdit: () => import('@Segments/pages/segments/_segment/_id').then((m) => m.default || m),
};

export const Tabs = {
    SegmentBaseTab: () => import('@Segments/components/Tabs/SegmentBaseTab').then((m) => m.default || m),
    SegmentTranslationsTab: () => import('@Segments/components/Tabs/SegmentTranslationsTab').then((m) => m.default || m),
    ConditionSetDesignTab: () => import('@Segments/components/Tabs/ConditionSetDesignTab').then((m) => m.default || m),
};

export const Icons = {
    Document: () => import('@Core/components/Icons/Menu/IconDocument'),
};
