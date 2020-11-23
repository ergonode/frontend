/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import Alert from '@UI/components/Alert/Alert';

export default {
    title: 'Components API/Alerts',
    component: Alert,
    argTypes: {
        id: {
            control: {
                disable: true,
                text: 'unique-id-example',
            },
        },
        type: {
            control: {
                type: 'select',
                options: Object.values(ALERT_TYPE),
            },
        },
        message: '',
    },
};

const Template = (args, {
    argTypes,
}) => ({
    template: '<Alert v-bind="$props" />',
    components: {
        Alert,
    },
    props: Object.keys(argTypes),
});

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
    id: '1',
    type: ALERT_TYPE.SUCCESS,
    message: 'That is success Alert',
};

export const InfoAlert = Template.bind({});
InfoAlert.args = {
    id: '2',
    type: ALERT_TYPE.INFO,
    message: 'That is info Alert',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
    id: '3',
    type: ALERT_TYPE.WARNING,
    message: 'That is warning Alert',
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
    id: '4',
    type: ALERT_TYPE.ERROR,
    message: 'That is error Alert',
};
