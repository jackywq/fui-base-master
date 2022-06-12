import { PlayCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'bisheng/router';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
// import { Bg } from 'site/assets/images/index';
import { getLocalizedPathname } from '../../utils';
import './index.less';
import Logo from './Logo';

const Banner = (props: { location: any }) => {
  const { location } = props;
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  return (
    <div className="home-banner">
      <div className="home-banner-holder">
        <div className="home-banner-content">
          <div>
            {/* <img src={Bg} alt="" /> */}
            <Logo />
          </div>
          <p>
            <FormattedMessage id="app.home.introduce" />
          </p>

          <a className="banner-video">
            <PlayCircleFilled /> <FormattedMessage id="app.home.play-video" />
          </a>

          <div className="home-banner-content-operations">
            <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN, location.query)}>
              <Button type="primary" shape="round">
                <FormattedMessage id="app.home.getting-started" />
              </Button>
            </Link>
            <Link to={getLocalizedPathname('/docs/spec/introduce', isZhCN, location.query)}>
              <Button shape="round" ghost>
                <FormattedMessage id="app.home.design-language" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
