import { mount, createLocalVue } from '@vue/test-utils';
import NavigationHeaderBreadcrumb from '~/components/ReusableHeader/NavigationHeaderBreadcrumb';

const localVue = createLocalVue();

describe('ReusableHeader/NavigationHeaderBreadcrumb', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(NavigationHeaderBreadcrumb, {
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
        expect(wrapper.is(NavigationHeaderBreadcrumb)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof NavigationHeaderBreadcrumb.name).toBe('string');
        expect(NavigationHeaderBreadcrumb.name).toEqual('NavigationHeaderBreadcrumb');
    });
});
