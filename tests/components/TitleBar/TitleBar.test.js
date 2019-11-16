import { shallowMount } from '@vue/test-utils';
import TitleBar from '~/components/TitleBar/TitleBar';

describe('TitleBar/TitleBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TitleBar, {
            propsData: {
                title: 'test',
                isReadOnly: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TitleBar.name).toBe('string');
        expect(TitleBar.name).toEqual('TitleBar');
    });

    it('WHEN title props is set THEN show text', () => {
        expect(wrapper.contains('.details__title')).toBeTruthy();
        expect(wrapper.find('.details__title').text()).toBe('test');
    });
});
