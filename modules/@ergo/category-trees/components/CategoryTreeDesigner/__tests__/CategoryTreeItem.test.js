/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import CategoryTreeItem from '../CategoryTreeItem';
import { ACTION } from '@Core/defaults/icons';

describe('CategoryTreeDesigner/CategoryTreeItem', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CategoryTreeItem, {
            propsData: {
                numberOfChildren: 0,
                item: {},
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof CategoryTreeItem.name).toBe('string');
        expect(CategoryTreeItem.name).toEqual('CategoryTreeItem');
    });

    it('Item has no children', () => {
        expect(wrapper.vm.numberOfChildren).toEqual(0);
        expect(wrapper.vm.hasChildren).toBeFalsy();
        expect(wrapper.find('.grid-item__icon').exists()).toBe(false);
        expect(wrapper.find('.grid-item__categories-length').exists()).toBe(false);
    });

    // FIXME
    // it('Item has children', () => {
    //     wrapper.setProps({
    //         numberOfChildren: 10,
    //     });
    //     expect(wrapper.vm.numberOfChildren).toEqual(10);
    //     expect(wrapper.vm.hasChildren).toBeTruthy();
    //     expect(wrapper.find('.grid-item__icon').exists()).toBe(true);
    // });

    // FIXME
    // it('Expanded state is emitted', () => {
    //     wrapper.setProps({
    //         numberOfChildren: 10,
    //     });
    //     const icon = wrapper.find('.grid-item__icon');
    //     icon.trigger('click');
    //     expect(wrapper.emitted().toggleItem).toBeTruthy();
    // });

    it('Expanded is icon', () => {
        wrapper.setProps({
            isExpanded: true,
        });
        expect(wrapper.vm.buttonExpanderIconState).toBe(ACTION.PLUS);
    });

    it('Expanded is not icon', () => {
        wrapper.setProps({
            isExpanded: false,
        });
        expect(wrapper.vm.buttonExpanderIconState).toBe(ACTION.MINUS);
    });
});
