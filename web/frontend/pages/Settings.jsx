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
            <card className="settingWrapper">
                <Tabs className="tabsWrap" tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <div className='settingwrap'>
                        <div className='ctaWrap'>
                            <ButtonGroup>
                                <Button>Cancel</Button>
                                <div className='saveCta'><Button>Save</Button></div>
                            </ButtonGroup>
                        </div>

                        {selected === 0 ?
                            <YourInfo />
                            : selected === 1 ?
                                <div className='styleWrap'>  <Style /></div>
                                : selected === 2 ?
                                    <div className='subWrap'>  <SubscriptionPlan /></div>
                                    : <div className='notifyWrap'> <Notifications /></div>
                        }
                    </div>
                </Tabs>
                <Footer />
            </card>
        </>
    )
}
