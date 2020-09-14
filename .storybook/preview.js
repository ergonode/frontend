/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import '!style-loader!css-loader!sass-loader!./reset-storybook.scss';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import {addDecorator, addParameters} from '@storybook/vue';

addDecorator(story => {
    document.body.classList.add('app');
    document.body.style.position = 'relative';
    return story();
})
addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
        inlineStories: true,
    },
});
