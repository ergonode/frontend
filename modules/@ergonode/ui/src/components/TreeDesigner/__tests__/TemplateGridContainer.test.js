/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import { Store } from 'vuex-mock-store';
import TreeDesignerDraggableLayer from '../TreeDesignerDraggableLayer';

// const localVue = createLocalVue();
// const store = new Store({
//     state: {
//         gridDesigner: {
//             fullGridData: [],
//             hiddenItems: {},
//         },
//         draggable: {
//             draggedElement: {},
//         },
//         authentication: {
//             language: 'EN',
//         },
//         list: {
//             listElements: [],
//         },
//     },
// });
// const mocks = {
//     $store: store,
// };
describe('TreeDesigner/TreeDesignerDraggableLayer', () => {
    it('Component is named well', () => {
        expect(typeof TreeDesignerDraggableLayer.name).toBe('string');
        expect(TreeDesignerDraggableLayer.name).toEqual('TreeDesignerDraggableLayer');
    });
});
