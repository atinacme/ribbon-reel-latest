import React, { useState, useCallback } from 'react'
import {
    Card, Page, Layout, ButtonGroup, Button, Stack, TextField, Heading, Badge, List, TextContainer, Link,
    DropZone, Thumbnail, Caption, RadioButton, ProgressBar
} from "@shopify/polaris";
import { NoteMinor } from '@shopify/polaris-icons';
import { TitleBar } from "@shopify/app-bridge-react";
import { Mark, Vector, Vector1 } from "../assets";

export default function OnboardingInfo() {
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState('disabled');

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        [],
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const fileUpload = !files.length && <>
        <Thumbnail size="small" alt="video camera" source={Vector} />
        <DropZone.FileUpload actionTitle='Add a video Message.' /><p>Powered by RibbonReel</p>
    </>;
    const uploadedFiles = files.length > 0 && (
        <div style={{ padding: '0' }}>
            <Stack vertical>
                {files.map((file, index) => (
                    <Stack alignment="center" key={index}>
                        <Thumbnail
                            size="small"
                            alt={file.name}
                            source={
                                validImageTypes.includes(file.type)
                                    ? window.URL.createObjectURL(file)
                                    : NoteMinor
                            }
                        />
                        <div>
                            {file.name} <Caption>{file.size} bytes</Caption>
                        </div>
                    </Stack>
                ))}
            </Stack>
        </div>
    );

    const handleChange = useCallback(
        (_checked, newValue) => setValue(newValue),
        [],
    );
    return (
        <Page narrowWidth>
            <TitleBar title="Onboarding Info" />
            <Stack fill>
                <Stack.Item><Thumbnail size="small" alt="logo" source={Mark} />ribbonreel</Stack.Item>
                <div style={{ display: 'flex' }}>
                    <TextContainer>
                        <div>
                            <p>1</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <p>2</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p>3</p>
                    </TextContainer>
                </div>
            </Stack>
            <Layout>
                <Layout.Section>
                    <Card title="Your Info" sectioned>
                        <p>Manage your contact details.</p>
                        <TextField label="Store name" value="Vandelay Industries" disabled autoComplete="off" />
                        <TextField
                            label="Email"
                            type="email"
                            value="mail@vandelayindustries.com"
                            helpText="We’ll use this address if we need to contact you about your account."
                            autoComplete="email"
                        />
                    </Card>
                </Layout.Section>
            </Layout>
            <Layout>
                <Layout.Section>
                    <Card title="Subcription Plan" sectioned>
                        <p>Manage your billing and payment plan.</p>
                        <div style={{ display: 'flex' }}>
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
                                <Stack>
                                    <Stack.Item>
                                        <Heading>$10</Heading>
                                    </Stack.Item>
                                    <Stack.Item>
                                        per month
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
                                        <Heading>Pro Plan</Heading>
                                    </Stack.Item>
                                    <Stack.Item>
                                        <Badge>Monthly</Badge>
                                    </Stack.Item>
                                </Stack>
                                <p>Our most popular plan for small shops.</p>
                                <Stack>
                                    <Stack.Item>
                                        <Heading>$20</Heading>
                                    </Stack.Item>
                                    <Stack.Item>
                                        per month
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
                                        <Heading>$30</Heading>
                                    </Stack.Item>
                                    <Stack.Item>
                                        per month
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
                    </Card>
                </Layout.Section>
                <TextContainer>Subscription will be monthly and payment method can be managed thru you <Link>shopify account</Link></TextContainer>
            </Layout>
            <Layout>
                <Layout.Section>
                    <Card title="Style" sectioned>
                        <p>Manage the design RibbonReel in your Cart.</p>
                        <Heading>Select Your Layout</Heading>
                        <div style={{ display: 'flex' }}>
                            <Card sectioned>
                                <DropZone onDrop={handleDropZoneDrop}>
                                    {uploadedFiles}
                                    {fileUpload}
                                </DropZone>
                                <RadioButton
                                    label="Compact Layout"
                                    helpText="Minimal design to maximize space"
                                    checked={value === 'disabled'}
                                    id="disabled"
                                    name="compact_layout"
                                    onChange={handleChange}
                                />
                                <strong>Recommended</strong>
                            </Card>
                            <Card sectioned>
                                <DropZone onDrop={handleDropZoneDrop}>
                                    {uploadedFiles}
                                    {fileUpload}
                                </DropZone>
                                <RadioButton
                                    label="Expanded Layout"
                                    helpText="Draw attention to gifting option"
                                    checked={value === 'disabled'}
                                    id="disabled"
                                    name="expanded_layout"
                                    onChange={handleChange}
                                />
                            </Card>
                            <Card sectioned>
                                <DropZone onDrop={handleDropZoneDrop}>
                                    {uploadedFiles}
                                    {fileUpload}
                                </DropZone>
                                <RadioButton
                                    label="Accordion Layout"
                                    helpText="Minimal design to maximize space"
                                    checked={value === 'disabled'}
                                    id="disabled"
                                    name="accordion_layout"
                                    onChange={handleChange}
                                />
                            </Card>
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
            <Stack>
                <Stack.Item>
                    © 2022 RibbonReel. All rights reserved.
                </Stack.Item>
                <Stack.Item>
                    Privacy Policy
                </Stack.Item>
                <Stack.Item>
                    <ButtonGroup>
                        <Button>Back</Button>
                        <Button primary>Next</Button>
                    </ButtonGroup>
                </Stack.Item>
            </Stack>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <div style={{ display: 'block', alignItems: 'center' }}>
                            {/* <Stack fill> */}
                            <Stack.Item><Thumbnail size="small" alt="logo" source={Vector1} /></Stack.Item>
                            <Stack.Item>Congratulations you finished setting up RibbonReel!</Stack.Item>
                            <Stack.Item>Your customers can now gift thier firends and family with Reels.</Stack.Item>
                            <Stack.Item><Button>Continue to Site</Button></Stack.Item>
                            <Stack.Item><Thumbnail size="small" alt="logo" source={Mark} />ribbonreel</Stack.Item>
                            {/* </Stack> */}
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
}
