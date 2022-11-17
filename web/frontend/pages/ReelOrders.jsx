import React, { useState, useCallback } from 'react';
import {
    Heading, TextField, Icon, DatePicker, Button, Popover, OptionList, Pagination,
    IndexTable, Card, useIndexResourceState
} from '@shopify/polaris'
import {
    SearchMinor, CalendarMinor, ImportMinor, SortMinor
} from '@shopify/polaris-icons';
import { Footer } from '../components';

export default function ReelOrders() {
    const [textFieldValue, setTextFieldValue] = useState();
    const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
        end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
    });
    const [selected, setSelected] = useState([]);
    const [popoverActive, setPopoverActive] = useState(false);
    const [calendarPopoverActive, setCalendarPopoverActive] = useState(false);
    const [moreFiltersSelected, setMoreFiltersSelected] = useState([]);
    const [moreFiltersPopoverActive, setMoreFiltersPopoverActive] = useState(false);
    const customers = [
        {
            id: '1',
            order: '#2901',
            date: 'Today at 6:55am',
            customer: 'Guy Hawkins',
            total: '$396.84',
            reelRevenue: '$1.99',
            shippingStatus: 'New Order',
            reelStatus: 'Pending',
            items: '1 item'
        },
        {
            id: '2',
            order: '#2901',
            date: 'Oct 12 at 6:55am',
            customer: 'Ralph Edwards',
            total: '$589.99',
            reelRevenue: '$1.99',
            shippingStatus: 'On Delivery',
            reelStatus: 'Recorded',
            items: '2 items'
        },
        {
            id: '3',
            order: '#2901',
            date: 'Today at 6:55am',
            customer: 'Guy Hawkins',
            total: '$396.84',
            reelRevenue: '$1.99',
            shippingStatus: 'New Order',
            reelStatus: 'Pending',
            items: '1 item'
        },
        {
            id: '4',
            order: '#2901',
            date: 'Oct 12 at 6:55am',
            customer: 'Ralph Edwards',
            total: '$589.99',
            reelRevenue: '$1.99',
            shippingStatus: 'On Delivery',
            reelStatus: 'Recorded',
            items: '2 items'
        },
        {
            id: '5',
            order: '#2901',
            date: 'Today at 6:55am',
            customer: 'Guy Hawkins',
            total: '$396.84',
            reelRevenue: '$1.99',
            shippingStatus: 'New Order',
            reelStatus: 'Pending',
            items: '1 item'
        },
        {
            id: '6',
            order: '#2901',
            date: 'Oct 12 at 6:55am',
            customer: 'Ralph Edwards',
            total: '$589.99',
            reelRevenue: '$1.99',
            shippingStatus: 'On Delivery',
            reelStatus: 'Recorded',
            items: '2 items'
        }
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
    );

    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        [],
    );

    const calendarTogglePopoverActive = useCallback(
        () => setCalendarPopoverActive((calendarPopoverActive) => !calendarPopoverActive),
        [],
    );

    const calendarActivator = (
        <Button onClick={calendarTogglePopoverActive} className="date">
            Date Range <Icon source={CalendarMinor} color="base" />
        </Button>
    );

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            Options
        </Button>
    );

    const moreFiltersTogglePopoverActive = useCallback(
        () => setMoreFiltersPopoverActive((moreFiltersPopoverActive) => !moreFiltersPopoverActive),
        [],
    );

    const moreFiltersActivator = (
        <Button onClick={moreFiltersTogglePopoverActive}>
            More filters
        </Button>
    );

    const rowMarkup = customers.map(
        ({ id, order, date, customer, total, reelRevenue, shippingStatus, reelStatus, items }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>{order}</IndexTable.Cell>
                <IndexTable.Cell>{date}</IndexTable.Cell>
                <IndexTable.Cell>{customer}</IndexTable.Cell>
                <IndexTable.Cell>{total}</IndexTable.Cell>
                <IndexTable.Cell>{reelRevenue}</IndexTable.Cell>
                <IndexTable.Cell>{shippingStatus}</IndexTable.Cell>
                <IndexTable.Cell>{reelStatus}</IndexTable.Cell>
                <IndexTable.Cell>{items}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <div className='order-wrapper'>
            <Heading>Reel Orders</Heading>
            <div className='reels-order_body'>
                <div className='order-serach_wrap'>
                    <TextField
                        type="text"
                        value={textFieldValue}
                        onChange={handleTextFieldChange}
                        prefix={<Icon
                            source={SearchMinor}
                            color="base"
                        />}
                        placeholder="Filter"
                        autoComplete="off"
                    />
                </div>
                <div className='order-cta-wrap'>
                    <div className='order-date'>
                        <div>
                            <Popover
                                active={calendarPopoverActive}
                                activator={calendarActivator}
                                onClose={calendarTogglePopoverActive}
                            >
                                <DatePicker
                                    month={month}
                                    year={year}
                                    onChange={setSelectedDates}
                                    onMonthChange={handleMonthChange}
                                    selected={selectedDates}
                                    allowRange
                                />
                            </Popover>
                        </div>
                    </div>
                    <div className='order-option'>
                        <Popover
                            active={popoverActive}
                            activator={activator}
                            onClose={togglePopoverActive}
                        >
                            <OptionList
                                onChange={setSelected}
                                options={[
                                    {
                                        value: 'byward_market',
                                        label: 'Byward Market',
                                        // active: true,
                                    },
                                    { value: 'centretown', label: 'Centretown' },
                                    {
                                        value: 'hintonburg',
                                        label: 'Hintonburg',
                                        // active: true,
                                    },
                                    { value: 'westboro', label: 'Westboro' },
                                    { value: 'downtown', label: 'Downtown' },
                                ]}
                                selected={selected}
                            />
                        </Popover>
                    </div>
                    <div>
                        <Popover
                            active={moreFiltersPopoverActive}
                            activator={moreFiltersActivator}
                            onClose={moreFiltersTogglePopoverActive}
                        >
                            <OptionList
                                onChange={setMoreFiltersSelected}
                                options={[
                                    {
                                        value: 'byward_market',
                                        label: 'Byward Market',
                                        // active: true,
                                    },
                                    { value: 'centretown', label: 'Centretown' },
                                    {
                                        value: 'hintonburg',
                                        label: 'Hintonburg',
                                        // active: true,
                                    },
                                    { value: 'westboro', label: 'Westboro' },
                                    { value: 'downtown', label: 'Downtown' },
                                ]}
                                selected={moreFiltersSelected}
                            />
                        </Popover>
                    </div>
                    <Button><Icon source={ImportMinor} color="base" />Download</Button>
                    <Button><Icon source={SortMinor} color="base" />Sort</Button>
                </div>
                <div className='pagination-wrap'>
                    <Pagination
                        hasPrevious
                        onPrevious={() => {
                            console.log('Previous');
                        }}
                        hasNext
                        onNext={() => {
                            console.log('Next');
                        }}
                    />
                </div>
            </div>
            <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={customers.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: 'Order' },
                        { title: 'Date' },
                        { title: 'Customer' },
                        { title: 'Total' },
                        { title: 'Reel Revenue' },
                        { title: 'Shipping Status' },
                        { title: 'Reel Status' },
                        { title: 'Items' }
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </Card>
            <Footer />
        </div>
    )
}
