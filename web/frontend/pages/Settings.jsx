import React, { useState, useCallback } from 'react'
import { Tabs, Button, ButtonGroup } from "@shopify/polaris";
import { Footer, Notifications, Style, SubscriptionPlan, YourInfo } from '../components';

export default function Settings() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'your-info-1',
            content: 'Your Info',
            accessibilityLabel: 'Your Info',
            panelID: 'your-info-content-1',
        },
        {
            id: 'style-1',
            content: 'Style',
            panelID: 'style-content-1',
        },
        {
            id: 'subscription-plan-1',
            content: 'Subscription Plan',
            panelID: 'subscription-plan-content-1',
        },
        {
            id: 'notifications-1',
            content: 'Notifications',
            panelID: 'notifications-content-1',
        },
    ];
    return (
        <>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button primary>Save</Button>
                </ButtonGroup>
                {selected === 0 ?
                    <YourInfo />
                    : selected === 1 ?
                        <Style />
                        : selected === 2 ?
                            <SubscriptionPlan />
                            : <Notifications />
                }
            </Tabs>
            <Footer />
        </>
    )
}
