import React, { useState, useCallback } from 'react';
import { Card, TextContainer, Checkbox } from '@shopify/polaris'

export function Notifications() {
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
    return (
        <div>
            <Card sectioned title="Notifications Settings">
                <p>We may still send you important notificatons about your account outside of your notification settings.</p>
                <Card.Section>
                    <Checkbox
                        label="Marketing Newsletter"
                        checked={checked}
                        onChange={handleChange}
                    />
                    <TextContainer>
                        These are email newsletters from RibbonReel's about promotions and product improvements.
                    </TextContainer>
                </Card.Section>
                <Card.Section>
                    <Checkbox
                        label="Order Updates"
                        checked={checked}
                        onChange={handleChange}
                    />
                    <TextContainer>
                        These are notifications for orders updates that require your immediate atention.
                    </TextContainer>
                </Card.Section>
                <Card.Section>
                    <Checkbox
                        label="Update Reminders"
                        checked={checked}
                        onChange={handleChange}
                    />
                    <TextContainer>
                        These are notifications to remind you of app updates you might have missed.
                    </TextContainer>
                </Card.Section>
            </Card>
        </div>
    )
}
