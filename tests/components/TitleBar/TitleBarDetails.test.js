import { mount } from '@vue/test-utils';
import TitleBarDetails from '~/components/TitleBar/TitleBarDetails';
import { GREEN, WHITE } from '~/assets/scss/_variables/_colors.scss';

describe('TitleBar/TitleBarDetails', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBarDetails, {
            propsData: {
                title: 'test',
                isBreadcrumb: true
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof TitleBarDetails.name).toBe('string');
        expect(TitleBarDetails.name).toEqual('TitleBarDetails');
        expect(wrapper).toMatchSnapshot();
    });

    it('WHEN title props is set THEN show text', () => {
      expect(wrapper.contains('.details__title')).toBeTruthy();
      expect(wrapper.find('.details__title').text()).toBe('test');
    });
});
