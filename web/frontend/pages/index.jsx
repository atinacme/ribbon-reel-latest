import {
  Card,
  Page,
  Layout,
  TextContainer,
  Banner,
  Link,
  Heading,
  Button,
  Thumbnail,
  Stack
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Stack>
        <Stack.Item fill>
          <Heading>Approve Subscription</Heading>
        </Stack.Item>
        <Stack.Item>
          <Button>Cancel</Button>
        </Stack.Item>
      </Stack>
      <div style={{ width: '100%', float: 'right' }}>
        <Banner
          title="Before you can purchase a shipping label, this change needs to be made:"
          status="warning"
        ></Banner>
      </div>
      <Layout>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '600px' }}>
            <Layout.Section>
              <Card sectioned>
                <TextContainer>
                  <div style={{ display: 'flex' }}>
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                      alt="Black choker necklace"
                    />
                    <div style={{ display: 'block', margin: '5px' }}>
                      <Heading>Ribbon Reel</Heading>
                      <div style={{ display: 'flex' }}>by<span className="placeholder col-6"></span></div>
                    </div>
                  </div>
                </TextContainer>
                <hr />
                <TextContainer>
                  <Heading>Ribbon Reel</Heading>
                  <div style={{ display: 'flex' }}><span className="placeholder col-6"></span>USD every 30 days</div>
                  <div style={{ display: 'flex' }}>Basic Plan-<span className="placeholder col-6"></span>USD</div>
                </TextContainer>
              </Card>
            </Layout.Section>
          </div>
          <div style={{ width: '400px' }}>
            <Layout.Section>
              <Card title="On your next bill" sectioned>
                <TextContainer>
                  <div style={{ display: 'block', margin: '5px' }}>
                    <Heading>Ribbon Reel</Heading>
                    <div style={{ display: 'flex' }}>$<span className="placeholder col-6"></span>USD</div>
                    <p>Recurring every 30 days</p>
                    <p>Starts today</p>
                  </div>
                </TextContainer>
                <hr />
                <p>30 days free trial</p>
                <p>Trial ends 19th August 2021</p>
                <hr />
                <Stack>
                  <Stack.Item fill>
                    <p>Amount</p>
                  </Stack.Item>
                  <Stack.Item>
                    <strong>$<span className="placeholder col-6"></span>USD</strong>
                  </Stack.Item>
                </Stack>
                <Stack>
                  <Stack.Item fill>
                    <p>Date</p>
                  </Stack.Item>
                  <Stack.Item>
                    <strong>19th August 2021</strong>
                  </Stack.Item>
                </Stack>
                <Button style={{ width: 'auto' }} primary>Start free trial</Button>
              </Card>
            </Layout.Section>
          </div>
        </div>
      </Layout>
      <div>
        By proceeding, you are agreeing to the <Link>Terms of Service</Link>,<br />
        Subject to government tax and other prevailing charges.
      </div>
    </Page>
  );
}
