/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import * as HeaderStories from './Header.stories';
import MyPage from './Page';

export default {
    title: 'Example/Page',
    component: MyPage,
};

const Template = (args, {
    argTypes,
}) => ({
    props: Object.keys(argTypes),
    components: {
        MyPage,
    },
    template:
    '<my-page :user="user" @onLogin="onLogin" @onLogout="onLogout" @onCreateAccount="onCreateAccount" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    ...HeaderStories.LoggedOut.args,
};
