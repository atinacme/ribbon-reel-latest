import React, { useState } from 'react'
import { Card, Layout, TextField } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { HomePageAction } from '../redux/Actions';

export function YourInfo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <Layout>
            <Layout.Section>
                <div className='info-wrapper'>
                    <Card title="Your Info" sectioned>
                        <p>Manage your contact details.</p>
                        <div className="textfeild-wrap">
                            <TextField label="Store name" value={state.homePage.store_name} disabled autoComplete="off" />
                            <TextField
                                label="Email"
                                type="email"
                                value={state.homePage.store_email}
                                onChange={(e) => {
                                    dispatch(HomePageAction(state.homePage.store_owner, state.homePage.store_name, e, state.homePage.subscription_plan_cost, state.homePage.style_layout));
                                }}
                                helpText="We’ll use this address if we need to contact you about your account."
                                autoComplete="email"
                            />
                        </div>
                    </Card>
                </div>
            </Layout.Section>
        </Layout>
    )
}
