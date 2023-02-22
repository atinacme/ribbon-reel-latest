import React, { useState, useCallback } from 'react';
import { Card, TextContainer, Checkbox } from '@shopify/polaris';
import { useSelector, useDispatch } from "react-redux";
import { SettingsPageAction } from '../redux/Actions';

export function Notifications() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [marketingChecked, setMarketingChecked] = useState(state.settingsPage.marketing_notifications);
    const [orderChecked, setOrderChecked] = useState(state.settingsPage.order_notifications);
    const [updateChecked, setUpdateChecked] = useState(state.settingsPage.update_notifications);
    const handleChangeMarketing = useCallback((newChecked) => {
        console.log("market---->", newChecked);
        setMarketingChecked(newChecked);
        dispatch(SettingsPageAction(state.settingsPage.store_owner, state.settingsPage.store_name, state.settingsPage.store_email, state.settingsPage.subscription_plan_cost, state.settingsPage.style_layout, newChecked, state.settingsPage.order_notifications, state.settingsPage.update_notifications));
    }, []);
    const handleChangeOrder = useCallback((newChecked) => {
        console.log("order---->", newChecked);
        setOrderChecked(newChecked);
        dispatch(SettingsPageAction(state.settingsPage.store_owner, state.settingsPage.store_name, state.settingsPage.store_email, state.settingsPage.subscription_plan_cost, state.settingsPage.style_layout, state.settingsPage.marketing_notifications, newChecked, state.settingsPage.update_notifications));
    }, []);
    const handleChangeUpdate = useCallback((newChecked) => {
        console.log("update---->", newChecked);
        setUpdateChecked(newChecked);
        dispatch(SettingsPageAction(state.settingsPage.store_owner, state.settingsPage.store_name, state.settingsPage.store_email, state.settingsPage.subscription_plan_cost, state.settingsPage.style_layout, state.settingsPage.marketing_notifications, state.settingsPage.order_notifications, newChecked));
    }, []);
    return (
        <div>
            <Card sectioned title="Notifications Settings">
                <p>We may still send you important notificatons about your account outside of your notification settings.</p>
                <Card.Section>
                    <Checkbox
                        label="Marketing Newsletter"
                        checked={marketingChecked}
                        onChange={handleChangeMarketing}
                    />
                    <TextContainer>
                        These are email newsletters from RibbonReel's about promotions and product improvements.
                    </TextContainer>
                </Card.Section>
                <Card.Section>
                    <Checkbox
                        label="Order Updates"
                        checked={orderChecked}
                        onChange={handleChangeOrder}
                    />
                    <TextContainer>
                        These are notifications for orders updates that require your immediate atention.
                    </TextContainer>
                </Card.Section>
                <Card.Section>
                    <Checkbox
                        label="Update Reminders"
                        checked={updateChecked}
                        onChange={handleChangeUpdate}
                    />
                    <TextContainer>
                        These are notifications to remind you of app updates you might have missed.
                    </TextContainer>
                </Card.Section>
            </Card>
        </div>
    );
}
