import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from 'antd';
import Banner from './Banner';
import DesignPage from './DesignPage';
import Footer from '../Layout/Footer';
import './index.less';

const { Title } = Typography;

function getStyle() {
  return `
    .rc-footer-container {
      padding-left: 0;
      padding-right: 0;
    }

    .rc-footer-columns {
      max-width: 1208px;
      margin: 0 auto;
    }
  `;
}

interface BlockContentProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
}

const BlockContent: React.FC<BlockContentProps> = ({ title, children, extra }) => (
  <div className="home-block-content">
    <Title level={2} style={{ fontWeight: 'lighter', color: '#314659' }}>
      {title}

      {extra && <div className="home-block-content-extra">{extra}</div>}
    </Title>
    {children}
  </div>
);

const Home = (props: { location: any }) => {
  const { location } = props;

  return (
    <div className="home-container">
      <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
      <Banner location={location} />
      <div style={{ maxWidth: 1256, margin: '0 auto' }}>
        <BlockContent title={<FormattedMessage id="app.home.design-and-framework" />}>
          <DesignPage location={location} />
        </BlockContent>
      </div>
      <Footer location={location} />
    </div>
  );
};

export default Home;
