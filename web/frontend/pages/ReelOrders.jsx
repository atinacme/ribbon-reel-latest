import React, { useState, useCallback, useEffect } from 'react';
import {
    Heading, TextField, Icon, DatePicker, Button, Popover, OptionList, Pagination, IndexTable, Card,
    useIndexResourceState, Modal, TextContainer, DropZone, List, Thumbnail, Banner, Stack
} from '@shopify/polaris'
import {
    SearchMinor, CalendarMinor, ImportMinor, SortMinor, NoteMinor
} from '@shopify/polaris-icons';
import { Footer } from '../components';
import { useAuthenticatedFetch } from '../hooks';
import { useSelector, useDispatch } from "react-redux";
import { OrderVideoAddService } from '../services/OrderService';

export default function ReelOrders() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [textFieldValue, setTextFieldValue] = useState();
    const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
        end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
    });
    const [customers, setCustomers] = useState([])
    const [selected, setSelected] = useState([]);
    const [popoverActive, setPopoverActive] = useState(false);
    const [calendarPopoverActive, setCalendarPopoverActive] = useState(false);
    const [moreFiltersSelected, setMoreFiltersSelected] = useState([]);
    const [moreFiltersPopoverActive, setMoreFiltersPopoverActive] = useState(false);
    const [active, setActive] = useState(false);
    const [files, setFiles] = useState();
    const [rejectedFiles, setRejectedFiles] = useState([]);
    const hasError = rejectedFiles.length > 0;
    const fetch = useAuthenticatedFetch();

    useEffect(() => {
        const handleGetAllOrders = async () => {
            fetch("/api/orders/all").then((res) => res.json()).then((data) => setCustomers(data));
        };
        handleGetAllOrders();
    }, [])

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

    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            setFiles(acceptedFiles[0]),
        [],
    );

    const validImageTypes = ['video/mp4'];

    const fileUpload = !files && <DropZone.FileUpload />;
    const uploadedFiles = files && (
        <div style={{ padding: '0' }}>
            <Stack vertical>
                {/* {files.map((file, index) => ( */}
                <Stack alignment="center">
                    <Thumbnail
                        size="small"
                        alt={files.name}
                        source={
                            validImageTypes.includes(files.type)
                                ? window.URL.createObjectURL(files)
                                : NoteMinor
                        }
                    />
                    <div>
                        {files.name}{' '}
                        <p>
                            {files.size} bytes
                        </p>
                    </div>
                </Stack>
                {/* ))} */}
            </Stack>
        </div>
    );

    const handleAddVideo = async (order_number) => {
        console.log("order---->", order_number)
        var formData = new FormData();
        formData.append('order_number', order_number)
        formData.append('file', files)
        try {
            const result = await OrderVideoAddService(formData)
            if (result) {
                setActive(!active)
                setFiles()
            }
        } catch (e) { }
    };

    const lineItems = customers.map(itm => itm.line_items.map((itms) => (itms.vendor.indexOf("RIBBON_REELS_CARD") > -1 ? itms.vendor : 0)).indexOf("RIBBON_REELS_CARD") > -1 ? itm : [])
    const rows = lineItems.map(element => {
        if (!Array.isArray(element)) {
            return element
        }
    })
    const rowsArray = rows.filter(item => item !== undefined)

    const rowMarkup = rowsArray.map((item, index) => (
        <>
            <IndexTable.Row
                id={item.id}
                key={item.id}
                selected={selectedResources.includes(item.id)}
                position={index}
                onClick={handleChange}
            >
                <IndexTable.Cell>{item.name}</IndexTable.Cell>
                <IndexTable.Cell>{item.created_at}</IndexTable.Cell>
                <IndexTable.Cell>{item.customer > 0 ? item.customer.default_address.company : ''}</IndexTable.Cell>
                <IndexTable.Cell>{item.total_price}</IndexTable.Cell>
                {/* <IndexTable.Cell>{reelRevenue}</IndexTable.Cell> */}
                <IndexTable.Cell>{item.fulfillments.length > 0 ? item.fulfillments[0].shipment_status : ''}</IndexTable.Cell>
                {/* <IndexTable.Cell>{reelStatus}</IndexTable.Cell> */}
                <IndexTable.Cell>{item.line_items.length}</IndexTable.Cell>
            </IndexTable.Row>
        </>
    ))

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
            <Modal
                // activator={ModalActivator}
                open={active}
                onClose={handleChange}
                title="Reach more shoppers with Instagram product tags"
                primaryAction={{
                    content: 'Add Instagram',
                    onAction: handleAddVideo,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleChange,
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <Stack vertical>
                            <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                                {uploadedFiles}
                                {fileUpload}
                            </DropZone>
                        </Stack>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Footer />
        </div>
    )
}
