import { mount, createLocalVue } from '@vue/test-utils';
import TitleBarBreadcrumb from '~/components/TitleBar/TitleBarBreadcrumb';

const localVue = createLocalVue();

describe('TitleBar/TitleBarBreadcrumb', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBarBreadcrumb, {
            localVue,
            propsData: {
                breadcrumb: {
                    title: 'Categories',
                    icon: 'Category',
                    path: '/categories',
                },

            },
            stubs: {
                NuxtLink: true,
            },
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(TitleBarBreadcrumb)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof TitleBarBreadcrumb.name).toBe('string');
        expect(TitleBarBreadcrumb.name).toEqual('TitleBarBreadcrumb');
    });
});
