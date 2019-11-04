import { shallowMount, createLocalVue } from '@vue/test-utils';
import TitleBarBreadcrumb from '~/components/TitleBar/TitleBarBreadcrumb';

const localVue = createLocalVue();

describe('TitleBar/TitleBarBreadcrumb', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TitleBarBreadcrumb, {
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

    it('Component is named well', () => {
        expect(typeof TitleBarBreadcrumb.name).toBe('string');
        expect(TitleBarBreadcrumb.name).toEqual('TitleBarBreadcrumb');
    });
});
