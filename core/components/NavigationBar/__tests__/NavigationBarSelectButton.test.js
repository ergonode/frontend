/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NavigationBarSelectButton from '~/core/components/NavigationBar/NavigationBarSelectButton';

const localVue = createLocalVue();

describe('/NavigationBar/NavigationBarSelectButton', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(NavigationBarSelectButton, {
            localVue,
        });
    });

    it('Component is named well', () => {
        expect(typeof NavigationBarSelectButton.name).toBe('string');
        expect(NavigationBarSelectButton.name).toEqual('NavigationBarSelectButton');
    });

    it('Check no title exception', () => {
        expect(wrapper.vm.title).toBeFalsy();
    });

    it('Check click', () => {
        const onClickStub = jest.fn();
        wrapper.setMethods({ onClick: onClickStub });
        wrapper.find('.bar-button').trigger('click');
        expect(onClickStub).toHaveBeenCalled();
    });
});
