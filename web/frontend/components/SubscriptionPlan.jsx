import React from 'react'
import { Card, Layout, TextContainer, Link, Heading, Stack, Badge, List } from "@shopify/polaris";

export function SubscriptionPlan() {
    return (
        <Layout>
            <Card sectioned>
                <Layout.Section>
                    <div className='subscription-wrapper'>
                        <div title="Subcription Plan">
                            <h2>Subcription Plan</h2>
                            <p>Manage your billing and payment plan.</p>
                            <div style={{ display: 'flex', paddingTop: '24px' }} className="Subcription-card">
                                <Card sectioned>
                                    <Stack>
                                        <Stack.Item>
                                            <Heading>Basic Plan</Heading>
                                        </Stack.Item>
                                        <Stack.Item>
                                            <Badge>Monthly</Badge>
                                        </Stack.Item>
                                    </Stack>
                                    <p>Our most popular plan for small shops.</p>
                                    <div className='Subcription-month_wrap'>
                                        <Stack>
                                            <Stack.Item>
                                                <span>$10</span>
                                            </Stack.Item>
                                            <Stack.Item>
                                                <span className='month-detail'>per month</span>
                                            </Stack.Item>

                                        </Stack>
                                    </div>
                                    <Stack>
                                        <List type="bullet">
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                        </List>
                                        Selected
                                    </Stack>
                                </Card>
                                <Card sectioned>
                                    <Stack>
                                        <Stack.Item>
                                            <Heading>Pro Plan</Heading>
                                        </Stack.Item>
                                        <Stack.Item>
                                            <Badge>Monthly</Badge>
                                        </Stack.Item>
                                    </Stack>
                                    <p>Our most popular plan for small shops.</p>
                                    <Stack>
                                        <Stack.Item>
                                            <span>$20</span>
                                        </Stack.Item>
                                        <Stack.Item>
                                            <span className='month-detail'>per month</span>
                                        </Stack.Item>
                                    </Stack>
                                    <Stack>
                                        <List type="bullet">
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                        </List>
                                        Selected
                                    </Stack>
                                </Card>
                                <Card sectioned>
                                    <Stack>
                                        <Stack.Item>
                                            <Heading>Max Plan</Heading>
                                        </Stack.Item>
                                        <Stack.Item>
                                            <Badge>Monthly</Badge>
                                        </Stack.Item>
                                    </Stack>
                                    <p>Our most popular plan for small shops.</p>
                                    <Stack>
                                        <Stack.Item>
                                            <span>$30</span>
                                        </Stack.Item>
                                        <Stack.Item>
                                            <span className='month-detail'>per month</span>
                                        </Stack.Item>
                                    </Stack>
                                    <Stack>
                                        <List type="bullet">
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                            <List.Item>### Amount of gifts</List.Item>
                                        </List>
                                        Selected
                                    </Stack>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Layout.Section>
                <TextContainer>Subscription will be monthly and payment method can be managed thru you <Link>shopify account</Link></TextContainer>
            </Card>
        </Layout>
    )
}
