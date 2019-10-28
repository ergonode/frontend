import { mount } from '@vue/test-utils';
import TitleBarActions from '~/components/TitleBar/TitleBarActions';

describe('TitleBar/TitleBarActions', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBarActions);
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof TitleBarActions.name).toBe('string');
        expect(TitleBarActions.name).toEqual('TitleBarActions');
    });

    it('Check option titles', () => {
      const obj = [{title: 'x'}, {title: 'y'}];
      const optionTitle = wrapper.vm.optionTitle(obj);
      expect(optionTitle).toEqual(['x', 'y']);
    });
});
