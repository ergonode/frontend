import { mount } from '@vue/test-utils';
import TitleBarHeader from '~/components/TitleBar/TitleBarHeader';
import { GREEN, WHITE } from '~/assets/scss/_variables/_colors.scss';

describe('TitleBar/TitleBarHeader', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBarHeader, {
            propsData: {
                title: 'test',
                isBreadcrumb: true
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TitleBarHeader.name).toBe('string');
        expect(TitleBarHeader.name).toEqual('TitleBarHeader');
        expect(wrapper).toMatchSnapshot();
    });
});
