/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import MyHeader from './Header';

export default {
    title: 'Example/Header',
    component: MyHeader,
};

const Template = (args, {
    argTypes,
}) => ({
    props: Object.keys(argTypes),
    components: {
        MyHeader,
    },
    template:
    '<my-header :user="user" @onLogin="onLogin" @onLogout="onLogout" @onCreateAccount="onCreateAccount" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
