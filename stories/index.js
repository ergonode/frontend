/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { storiesOf } from '@storybook/vue';

storiesOf('List', module)
    .add('As a component', () => ({
        template: '<List />',
    }))
    .add('I don\'t work', () => '<List />');
