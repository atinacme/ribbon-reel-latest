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
        <div className="riben-reels-wrapper">
          <div className="left-ribon-reels_plan">
            <Layout.Section>
              <Card sectioned>
                <TextContainer>
                  <div className="riben-content">
                 <div className="riben-content_img"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" viewBox="0 0 35 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0378113 0.681641H4.8395C6.11223 0.681641 7.33284 1.18723 8.2328 2.08719C9.13275 2.98715 9.63834 4.20775 9.63834 5.48049H4.8395V15.081C5.46992 15.081 6.09416 15.2052 6.67656 15.4466C7.25897 15.6879 7.78812 16.0417 8.23377 16.4876C8.67942 16.9335 9.03284 17.4628 9.27384 18.0454C9.51484 18.6279 9.63869 19.2523 9.63831 19.8827V24.6816H4.83947V15.081C4.20905 15.0814 3.58473 14.9575 3.00219 14.7165C2.41964 14.4755 1.89028 14.1221 1.44437 13.6765C0.998451 13.2308 0.644716 12.7017 0.403373 12.1193C0.162032 11.5369 0.0378113 10.9126 0.0378113 10.2822V0.681641ZM9.63834 5.48049C10.2688 5.48048 10.893 5.6047 11.4754 5.84605C12.0578 6.08739 12.587 6.44112 13.0326 6.88704C13.4783 7.33295 13.8317 7.86231 14.0727 8.44486C14.3137 9.02741 14.4376 9.65174 14.4372 10.2822V15.081C13.1645 15.081 11.9439 14.5754 11.0439 13.6755C10.1439 12.7755 9.63834 11.5549 9.63834 10.2822V5.48049ZM24.5725 0.681641V5.48049C24.5721 6.11092 24.696 6.73525 24.937 7.3178C25.178 7.90035 25.5314 8.4297 25.9771 8.87562C26.4227 9.32153 26.9518 9.67527 27.5343 9.91661C28.1167 10.158 28.7409 10.2822 29.3714 10.2822L29.3714 19.8827H24.5725C24.5725 21.1554 25.0781 22.376 25.9781 23.276C26.878 24.176 28.0986 24.6816 29.3714 24.6816H34.173V15.081C34.173 14.4506 34.0488 13.8263 33.8075 13.2439C33.5661 12.6615 33.2124 12.1324 32.7665 11.6867C32.3206 11.2411 31.7912 10.8876 31.2087 10.6466C30.6261 10.4057 30.0018 10.2818 29.3714 10.2822V0.681641H24.5725ZM14.972 5.48049V0.681641H19.7737V10.2822C21.0464 10.2822 22.267 10.7878 23.1669 11.6877C24.0669 12.5877 24.5725 13.8083 24.5725 15.081V19.8827C23.942 19.8827 23.3178 19.7585 22.7354 19.5171C22.153 19.2758 21.6238 18.9221 21.1782 18.4762C20.7325 18.0302 20.3791 17.5009 20.1381 16.9183C19.8971 16.3358 19.7733 15.7115 19.7736 15.081V10.2822C18.5002 10.2822 17.2788 9.77628 16.3784 8.87579C15.4779 7.9753 14.972 6.75397 14.972 5.48049ZM14.4372 24.6816V15.081C15.7107 15.081 16.932 15.5869 17.8325 16.4874C18.733 17.3879 19.2389 18.6092 19.2389 19.8827V24.6816H14.4372Z" fill="white"/>
</svg></div> 
                    <div className="riben-heading">
                      <Heading>Ribbon Reel</Heading>
                      <div style={{ display: 'flex' }}>by<span className="placeholder col-6"></span></div>
                    </div>
                  </div>
                </TextContainer>
                <hr />
                <TextContainer>
                  <Heading>Ribbon Reel</Heading>
                  <div style={{ display: 'flex'}}><span className="placeholder col-6" style={{ width: '54px', height: '19px', marginleft: '5px'}}></span>USD every 30 days</div>
                  <div style={{ display: 'flex' }}>Basic Plan-<span className="placeholder col-6" style={{width: '54px', height: '19px', margin: '0 5px' }}></span>USD</div>
                </TextContainer>
              </Card>
            </Layout.Section>
          </div>
          <div className="right_riben-reels">
            <Layout.Section>
              <Card title="On your next bill" sectioned>
                <TextContainer>
                  <div style={{ display: 'block', margin: '5px' }}>
                   <div  className="heading-with-bg">  <Heading>Ribbon Reel</Heading> </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>$<span className="placeholder col-6" style={{width: '44px', height: '19px'}}></span>USD</div>
                    <p>Recurring every 30 days</p>
                    <p>Starts today</p>
                  </div>
                </TextContainer>
                <hr />
                <div class="riben-para">
                <p>30 days free trial</p>
                <p>Trial ends 19th August 2021</p>
                </div>
                <hr />
                <Stack>
                  <Stack.Item fill>
                    <p>Amount</p>
                  </Stack.Item>
                  <Stack.Item>
                    <strong>$<span className="placeholder col-6" style={{width: '43px',
height: '15px'}}></span>USD</strong>
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
              <div style={{padding: '20px'}}> <Button style={{ width: 'auto' }} primary>Start free trial</Button></div> 
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
