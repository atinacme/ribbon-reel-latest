import React, { useState, useCallback } from 'react'
import { Card, Layout, DropZone, RadioButton, Thumbnail } from "@shopify/polaris";
import { Vector } from "../assets";

export function Style() {
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
    return (
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
                                <div className='compact-dropzone'>
                                    <DropZone onDrop={handleDropZoneDrop}>
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
    )
}
