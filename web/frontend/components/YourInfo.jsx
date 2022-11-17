import React from 'react'
import { Card, Layout, TextField } from "@shopify/polaris";

export function YourInfo() {
    return (
        <Layout>
            <Layout.Section>
                <div className='info-wrapper'>
                    <Card title="Your Info" sectioned>
                        <p>Manage your contact details.</p>
                        <div className="textfeild-wrap">
                            <TextField label="Store name" value="Vandelay Industries" disabled autoComplete="off" />
                            <TextField
                                label="Email"
                                type="email"
                                value="mail@vandelayindustries.com"
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
