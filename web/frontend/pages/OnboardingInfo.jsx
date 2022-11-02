import React, { useState, useCallback } from 'react'
import {
    Card, Page, Layout, ButtonGroup, Button, Stack, TextField, Heading, Badge, List, TextContainer, Link,
    DropZone, Thumbnail, Caption, RadioButton, ProgressBar
} from "@shopify/polaris";
import { NoteMinor } from '@shopify/polaris-icons';
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { Mark, Vector, Vector1 } from "../assets";

export default function OnboardingInfo() {
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState('disabled');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        [],
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const fileUpload = !files.length && <>
        <Thumbnail size="small" alt="video camera" source={Vector} />
        <DropZone.FileUpload actionTitle='Add a video Message.' /><p>Powered by <span>RibbonReel</span></p>
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
    const handleBack = () => {
        if (page === 1) {
            navigate("/")
        } else if (page === 2) {
            setPage(1)
        } else {
            setPage(2)
        }
    }
    const handleNext = () => {
        if (page === 1) {
            setPage(2)
        } else if (page === 2) {
            setPage(3)
        } else {
            setPage(4)
        }
    }
    return (
        <div className='onboard-wrap'>
            <Page narrowWidth>
                <div className='onboard-items'>
                    <TitleBar title="Onboarding Info" />
                    <Stack fill>
                        <Stack.Item><div style={{ display: 'flex', alignItems: 'center' }}><Thumbnail size="small" alt="logo" source={Mark} /><h2>ribbonreel</h2></div></Stack.Item>
                        <div className='onboard-progressbar'>
                            <TextContainer>
                                <div className='progress-wrap'>
                                    <span>1</span>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className='progress-wrap'>
                                    <span>2</span>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className='progress-wrap'>
                                    <span>3</span>
                                </div>

                            </TextContainer>
                        </div>
                    </Stack>
                </div>
                {page === 1 ?
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
                    : page === 2 ?
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
                        : page === 3 ?
                            <Layout>
                                <Layout.Section>
                                    <div className='compact-layout_wrap'>
                                        <Card title="Style" sectioned>
                                            <p>Manage the design RibbonReel in your Cart.</p>
                                            <h3>Select Your Layout</h3>
                                            <div style={{ display: 'flex', paddingTop: '24px' }} className='compact-layout_card'>
                                                <Card sectioned>
                                                    <div className='compact-dropzone'>  <DropZone onDrop={handleDropZoneDrop}>
                                                        {uploadedFiles}
                                                        {fileUpload}
                                                    </DropZone>
                                                    </div>
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
                                                    <div className='compact-dropzone'>  <DropZone onDrop={handleDropZoneDrop}>
                                                        {uploadedFiles}
                                                        {fileUpload}
                                                    </DropZone>
                                                    </div>
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
                                                    <div className='compact-dropzone'>  <DropZone onDrop={handleDropZoneDrop}>
                                                        {uploadedFiles}
                                                        {fileUpload}
                                                    </DropZone>
                                                    </div>
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
                                    </div>
                                </Layout.Section>
                            </Layout>
                            :
                            <Layout>
                                <Layout.Section>
                                    <div className='congrats-wrap'>
                                        <Card sectioned>
                                            <div style={{ display: 'block', alignItems: 'center' }}>
                                                {/* <Stack fill> */}
                                                <Stack.Item><Thumbnail size="small" alt="logo" source={Vector1} /></Stack.Item>
                                                <h3>Congratulations you finished setting up RibbonReel!</h3>
                                                <h4>Your customers can now gift thier firends and family with Reels.</h4>
                                                <Stack.Item><Button>Continue to Site</Button></Stack.Item>
                                                <Stack.Item><Thumbnail size="small" alt="logo" source={Mark} />ribbonreel</Stack.Item>
                                                {/* </Stack> */}
                                            </div>
                                        </Card>
                                    </div>
                                </Layout.Section>
                            </Layout>
                }
                {page === 1 || page === 2 || page === 3 ?
                    <div className='copyright'>
                        <Stack>
                            <Stack.Item>
                                © 2022 RibbonReel. All rights reserved. <span>Privacy Policy</span>
                            </Stack.Item>
                            <Stack.Item>
                                <ButtonGroup>
                                    <Button onClick={handleBack}>Back</Button>
                                    <div className="next-cta"><Button onClick={handleNext}>Next</Button></div>
                                </ButtonGroup>
                            </Stack.Item>
                        </Stack>
                    </div>
                    : null}
            </Page>
        </div>
    )
}
