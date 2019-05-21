/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from "@vue/test-utils"
import ToolBarButton from '~/components/Navigation/ToolBar/ToolBarButton';

describe('Navigation/ToolBar/ToolBarButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ToolBarButton);
  });

  it("Component renders correctly", () => {
    expect(wrapper.is(ToolBarButton)).toBe(true);
  });

  it('Check if component is named correctly', () => {
    expect(typeof ToolBarButton.name).toBe('string');
    expect(ToolBarButton.name).toEqual('ToolBarButton');
  });
});
