import React, { useState, useCallback, useEffect } from 'react';
import {
    Heading, TextField, Icon, DatePicker, Button, Popover, OptionList, Pagination, IndexTable, Card,
    useIndexResourceState, Modal, TextContainer, DropZone, List, Thumbnail, Banner, Stack
} from '@shopify/polaris';
import {
    SearchMinor, CalendarMinor, ImportMinor, SortMinor, NoteMinor, CircleCancelMajor
} from '@shopify/polaris-icons';
import { Footer } from '../components';
import { useSelector } from "react-redux";
import moment from 'moment';
import { useAuthenticatedFetch } from '../hooks';
import { OrderCreateService, OrderGetFileService, OrderMailService, OrderVideoAddService } from '../services/OrderService';

export default function ReelOrders() {
    const state = useSelector((state) => state);
    const [customers, setCustomers] = useState([]);
    const [active, setActive] = useState(false);
    const [orderNumber, setOrderNumber] = useState();
    const [addedVideo, setAddedVideo] = useState();
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };
    const fetch = useAuthenticatedFetch();

    useEffect(() => {
        const handleGetAllOrders = async () => {
            fetch("/api/orders/all").then((res) => res.json()).then((data) => {
                const lineItems = data.map(itm => itm.line_items.map((itms) => (itms.vendor.indexOf("RIBBON_REELS_CARD") > -1 ? itms.vendor : 0)).indexOf("RIBBON_REELS_CARD") > -1 ? itm : []);
                const rows = lineItems.map(element => {
                    if (!Array.isArray(element)) {
                        return element;
                    }
                });
                const rowsArray = rows.filter(item => item !== undefined);
                setCustomers(rowsArray);
                const newArr = rowsArray.map(v => ({ ...v, store_owner: state.homePage.store_owner }));
                OrderCreateService(newArr);
            });
        };
        handleGetAllOrders();
    }, []);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const handleSendMail = async () => {
        const data = {
            mail_to: 'atingupta@acmeintech.in',
            store_owner: state.homePage.store_owner,
            order_number: orderNumber
        };
        try {
            const result = await OrderMailService(data);
            if (result) {
            }
        } catch (e) { }
    };

    const handleGetOrderFile = async (order) => {
        try {
            const data = {
                order_number: order
            };
            const result = await OrderGetFileService(data);
            if (result) {
                setAddedVideo(result[0].filename);
            }
        } catch (e) { }
    };

    const rowMarkup = customers.map((item, index) => (
        <>
            <IndexTable.Row
                id={item.id}
                key={item.id}
                position={index}
                onClick={() => {
                    handleChange();
                    setOrderNumber(item.order_number);
                    handleGetOrderFile(item.order_number);
                }}
            >
                <IndexTable.Cell>{item.name}</IndexTable.Cell>
                <IndexTable.Cell>{moment(item.created_at).format('MM/DD/YYYY')}</IndexTable.Cell>
                <IndexTable.Cell>{item.customer.first_name + " " + item.customer.last_name}</IndexTable.Cell>
                <IndexTable.Cell>{item.total_price}</IndexTable.Cell>
                <IndexTable.Cell>{item.line_items[0].price}</IndexTable.Cell>
                <IndexTable.Cell>{item.source_name}</IndexTable.Cell>
                <IndexTable.Cell>{item.line_items.length}</IndexTable.Cell>
            </IndexTable.Row>
        </>
    ));

    return (
        <div className='order-wrapper'>
            <Heading>Reel Orders</Heading>
            <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={customers.length}
                    headings={[
                        { title: 'Order' },
                        { title: 'Date' },
                        { title: 'Customer' },
                        { title: 'Total' },
                        { title: 'Reel Revenue' },
                        { title: 'Shipping Status' },
                        { title: 'Items' }
                    ]}
                    selectable={false}
                >
                    {rowMarkup}
                </IndexTable>
            </Card>
            <Modal
                open={active}
                onClose={handleChange}
                title="Reach more shoppers with Instagram product tags"
                primaryAction={!addedVideo ? {
                    content: 'Add Instagram',
                    onAction: handleSendMail,
                } : null}
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

                            {addedVideo ?
                                <p>Customer has added the Video Message</p>
                                :
                                <p>Send Mail to this Customer for Video Message</p>
                            }
                        </Stack>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Footer />
        </div>
    );
}
