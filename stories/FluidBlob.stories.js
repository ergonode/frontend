/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import FluidBlob from '@UI/components/FluidBlob/FluidBlob';

export default {
    title: 'Components API/FluidBlob',
    component: FluidBlob,
};

const Template = () => ({
    template: `
        <div style="height: 600px">
            <FluidBlob />
        </div>
    `,
    components: {
        FluidBlob,
    },
});

export const Animating = Template.bind({});
