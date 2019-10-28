import { mount } from '@vue/test-utils';
import TitleBar from '~/components/TitleBar/TitleBar';

describe('TitleBar/TitleBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBar, {
            propsData: {
                title: 'test',
                isReadOnly: true,
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof TitleBar.name).toBe('string');
        expect(TitleBar.name).toEqual('TitleBar');
    });

    it('WHEN title props is set THEN show text', () => {
        expect(wrapper.contains('.details__title')).toBeTruthy();
        expect(wrapper.find('.details__title').text()).toBe('test');
    });

    it('WHEN badge props is set THEN show text', () => {
        expect(wrapper.contains('.badge__title')).toBeTruthy();
        expect(wrapper.find('.badge__title').text()).toBe('READ ONLY');
    });
});
