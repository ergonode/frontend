/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Configuration"
        :fields-keys="[activeFieldKey, startFieldKey, hourFieldKey]">
        <template #body="{ errorMessages }">
            <FormSection>
                <Toggler
                    :value="isActive"
                    label="Is active"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[activeFieldKey]"
                    @input="setIsActiveValue" />
                <DatePicker
                    :value="date"
                    :placeholder="format"
                    :format="format"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[startFieldKey]"
                    label="Date"
                    @input="setDateChange" />
                <TextField
                    :value="time"
                    :disabled="isDisabledByPrivileges"
                    :input="timeInputType"
                    :error-messages="errorMessages[startFieldKey]"
                    label="Started on"
                    @input="setTimeChange" />
                <Divider />
                <TextField
                    :value="recurrency"
                    :disabled="isDisabledByPrivileges"
                    :input="timeInputType"
                    :error-messages="errorMessages[hourFieldKey]"
                    label="Recurrency"
                    hint="The time interval determining how often process would be executed"
                    @input="setRecurrencyChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Channels/config/privileges';
import {
    DEFAULT_FORMAT,
    DEFAULT_HOUR_FORMAT,
} from '@Core/models/calendar/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SchedulerForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        DatePicker: () => import('@Core/components/Inputs/DatePicker/DatePicker'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    data() {
        return {
            schedulerConfiguration: {},
        };
    },
    computed: {
        ...mapState('channels', [
            'scheduler',
        ]),
        isDisabledByPrivileges() {
            return !this.$hasAccess([
                PRIVILEGES.CHANNEL.update,
            ]);
        },
        isActive() {
            const {
                active,
            } = this.schedulerConfiguration;

            return active;
        },
        date() {
            const {
                start,
            } = this.schedulerConfiguration;

            if (start) {
                const [
                    date,
                ] = start.split(' ');

                return parseDate(date, DEFAULT_FORMAT, new Date());
            }

            return null;
        },
        time() {
            const {
                start,
            } = this.schedulerConfiguration;

            return start ? start.split(' ')[1] : null;
        },
        recurrency() {
            const {
                hour,
                minute,
            } = this.schedulerConfiguration;

            if (typeof hour !== 'undefined' && typeof minute !== 'undefined') {
                const parseTime = parseDate(`${hour}:${minute}`, DEFAULT_HOUR_FORMAT, new Date());

                return hour !== null && minute !== null
                    ? formatDate(parseTime, DEFAULT_HOUR_FORMAT)
                    : null;
            }

            return null;
        },
        format() {
            return DEFAULT_FORMAT;
        },
        timeInputType() {
            return {
                type: 'time',
            };
        },
        activeFieldKey() {
            return 'active';
        },
        startFieldKey() {
            return 'start';
        },
        hourFieldKey() {
            return 'hour';
        },
    },
    watch: {
        scheduler: {
            immediate: true,
            handler() {
                this.schedulerConfiguration = this.scheduler ? JSON.parse(this.scheduler) : {};
            },
        },
    },
    methods: {
        ...mapActions('channels', [
            '__setState',
        ]),
        setIsActiveValue(value) {
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                active: value,
            };

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify(tmpScheduler),
            });
        },
        setDateChange(value) {
            let date = value ? formatDate(value, DEFAULT_FORMAT) : null;

            if (this.time) {
                date = `${date} ${this.time}`;
            }

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify({
                    ...this.schedulerConfiguration,
                    start: date,
                }),
            });
        },
        setTimeChange(value) {
            let tmpDate = `${formatDate(new Date(), DEFAULT_FORMAT)} ${value}`;
            const {
                start,
            } = this.schedulerConfiguration;

            if (start) {
                const [
                    date,
                ] = start.split(' ');

                tmpDate = `${date} ${value}`;
            }

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify({
                    ...this.schedulerConfiguration,
                    start: tmpDate,
                }),
            });
        },
        setRecurrencyChange(value) {
            const [
                hour,
                minute,
            ] = value.split(':');
            const tmpScheduler = {
                ...this.schedulerConfiguration,
                hour: hour ? parseInt(hour, 10) : 0,
                minute: minute ? parseInt(minute, 10) : 0,
            };

            this.__setState({
                key: 'scheduler',
                value: JSON.stringify(tmpScheduler),
            });
        },
    },
};
</script>
