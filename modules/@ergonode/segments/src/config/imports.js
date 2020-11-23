/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Segments: () => import('@Segments/pages/segments/index').then(m => m.default || m),
    SegmentEdit: () => import('@Segments/pages/segments/_segment/_id').then(m => m.default || m),
};

export const Tabs = {
    SegmentsGridTab: () => import('@Segments/components/Tabs/SegmentsGridTab').then(m => m.default || m),
    SegmentGeneralTab: () => import('@Segments/components/Tabs/SegmentGeneralTab').then(m => m.default || m),
    SegmentTranslationsTab: () => import('@Segments/components/Tabs/SegmentTranslationsTab').then(m => m.default || m),
    ConditionDesignerTab: () => import('@Segments/components/Tabs/ConditionDesignerTab').then(m => m.default || m),
};

export const Icons = {
    Product: () => import('@Products/components/Icons/IconProduct'),
};
