import { shallowMount } from '@vue/test-utils';
import FadeTransition from '~/components/Transitions/FadeTransition';

describe('Transitions/FadeTransition', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(FadeTransition);
    });

    it('Component is named well', () => {
        expect(typeof FadeTransition.name).toBe('string');
        expect(FadeTransition.name).toEqual('FadeTransition');
    });
});
