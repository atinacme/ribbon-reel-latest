import React, { useState, useCallback, useEffect } from 'react'
import { Tabs, Button, ButtonGroup } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { Footer, Notifications, Style, SubscriptionPlan, YourInfo } from '../components';
import { OnboardingGetParticularService, OnboardingUpdateParticularService } from '../services/OnboardingService';
import { SettingsPageAction } from '../redux/Actions';

export default function Settings() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);

    const handleSettingsOnboarding = async () => {
        try {
            const data = await OnboardingGetParticularService(state.homePage.store_name)
            dispatch(SettingsPageAction(data[0].merchant_name, data[0].store_name, data[0].account_email, data[0].subscription_plan, data[0].layout, data[0].notifications));
        } catch (e) { }
    }

    useEffect(() => {
        handleSettingsOnboarding()
    }, [])

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

    const handleSaveSettings = async () => {
        const data = {
            account_email: state.settingsPage.store_email,
            layout: state.settingsPage.style_layout,
            subscription_plan: state.settingsPage.subscription_plan_cost,
            notifications: state.settingsPage.notifications
        }
        try {
            const result = await OnboardingUpdateParticularService(state.settingsPage.store_name, data)
            if (result) {
                handleSettingsOnboarding()
            }
        } catch (e) { }
    }
    return (
        <>
            <card className="settingWrapper">
                <Tabs className="tabsWrap" tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <div className='settingwrap'>
                        <div className='ctaWrap'>
                            <ButtonGroup>
                                <Button>Cancel</Button>
                                <div className='saveCta'><Button onClick={handleSaveSettings}>Save</Button></div>
                            </ButtonGroup>
                        </div>

                        {selected === 0 ?
                            <YourInfo />
                            : selected === 1 ?
                                <div className='styleWrap'><Style /></div>
                                : selected === 2 ?
                                    <div className='subWrap'><SubscriptionPlan /></div>
                                    : <div className='notifyWrap'><Notifications /></div>
                        }
                    </div>
                </Tabs>
                <Footer />
            </card>
        </>
    )
}
