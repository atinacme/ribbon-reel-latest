import React, { useState, useCallback } from 'react'
import {
    Card, Page, Layout, Select, Button, Stack, TextField, Heading, Badge, List, TextContainer, Link,
    DropZone, Thumbnail, Caption, RadioButton, ProgressBar
} from "@shopify/polaris";
import { NoteMinor } from '@shopify/polaris-icons';
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { MerchantDashboard, Vector, RevenueArrow, Imageshoe } from "../assets";

export default function MerchantDashboardPage() {
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState('disabled');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
            const data = await res.json()
            console.log(data)
        }
        fetchPrices()
    }, []);
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
        <div className=''>
            <Page narrowWidth>
                {/* <div className=''>
                    <TitleBar title="" />
                    <Stack fill>
                        <Stack.Item><div style={{ display: 'flex', alignItems: 'center' }}><Thumbnail size="small" alt="logo" source={Mark} /><h2>ribbonreel</h2></div></Stack.Item>
                        <div className=''>
                            <Button>Continue to Site</Button>
                        </div>
                    </Stack>
                </div> */}
                <Layout>
                    <Layout.Section>
                        <div className=''>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <Stack.Item><Thumbnail size="small" alt="logo" source={MerchantDashboard} /></Stack.Item>
                                    <h3>Oh! Seems like some ribbons were left out...</h3>
                                    <h4>We just need need to wrap the setup!</h4>
                                    <Stack.Item><Button>Finish Account Setup</Button></Stack.Item>
                                </div>
                            </Card>
                        </div>
                    </Layout.Section>
                </Layout>
                <Layout>
                    <Layout.Section>
                        <div className=''>
                            <TextContainer>Good Afternoon</TextContainer>
                            <Heading>Alexander</Heading>
                            <TextContainer>Here’s what’s happening with Ribbon Reel today.</TextContainer>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Total Gift Revenue</h3>
                                    <h4>$9,475.31</h4>
                                    <Stack.Item>
                                        <Thumbnail size="small" alt="logo" source={RevenueArrow} />3%
                                        <TextContainer>+$39.8 this week</TextContainer>
                                    </Stack.Item>
                                </div>
                            </Card>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Total Gifting Customers</h3>
                                    <h4>345</h4>
                                    <Stack.Item>
                                        <Thumbnail size="small" alt="logo" source={RevenueArrow} />3%
                                        <TextContainer>+$39.8 this week</TextContainer>
                                    </Stack.Item>
                                </div>
                            </Card>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Total Reel Orders</h3>
                                    <h4>3,169</h4>
                                    <Stack.Item>
                                        <Thumbnail size="small" alt="logo" source={RevenueArrow} />3%
                                        <TextContainer>+$39.8 this week</TextContainer>
                                    </Stack.Item>
                                </div>
                            </Card>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Most Gifted Product</h3>
                                    <Thumbnail size="small" alt="logo" source={Imageshoe} /><h4>$9,475.31</h4>
                                    <Stack.Item>
                                        <Thumbnail size="small" alt="logo" source={RevenueArrow} />3%
                                        <TextContainer>+$39.8 this week</TextContainer>
                                    </Stack.Item>
                                </div>
                            </Card>
                        </div>
                    </Layout.Section>
                </Layout>
                <Layout>
                    <Layout.Section>
                        <div className=''>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Reel's Revenue</h3>
                                    <Select
                                        label="Date range"
                                        options={options}
                                        onChange={handleSelectChange}
                                        value={selected}
                                    />
                                </div>
                            </Card>
                            <Card sectioned>
                                <div style={{ display: 'block', alignItems: 'center' }}>
                                    <h3>Total Gifting Customers</h3>
                                    <h4>345</h4>
                                    <Stack.Item>
                                        <Thumbnail size="small" alt="logo" source={RevenueArrow} />3%
                                        <TextContainer>+$39.8 this week</TextContainer>
                                    </Stack.Item>
                                </div>
                            </Card>
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    )
}
