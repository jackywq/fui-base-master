import React from 'react';
import { message } from 'antd';
import RcFooter from 'rc-footer';
import { presetPalettes } from '@ant-design/colors';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { GitlabOutlined } from '@ant-design/icons';
import ColorPicker from '../Color/ColorPicker';
import { loadScript } from '../utils';

class Footer extends React.Component<WrappedComponentProps & { location: any }> {
  lessLoaded = false;

  state = {
    color: presetPalettes.blue.primary,
  };

  // eslint-disable-next-line class-methods-use-this
  getColumns() {
    const col1 = {
      title: <FormattedMessage id="app.footer.resources" />,
      items: [
        {
          title: '@fui/bs',
          url: 'http://znqdjsjs-sit.fn-docs-react.sitapis.yonghui.cn/',
          openExternal: true,
        },
        {
          title: 'fis-meng-ui',
          url: 'http://znqdjsjs-sit.fn-docs-vue.sitgw.yonghui.cn/',
          openExternal: true,
        },
      ],
    };

    const col2 = {
      title: <FormattedMessage id="app.footer.help" />,
      items: [
        {
          icon: <GitlabOutlined />,
          title: 'Gitlab',
          url: 'http://gitlab.yonghui.cn/operation-cp-znqdjsjs/fui-base',
          openExternal: true,
        },
      ],
    };

    const col3 = {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
          alt="Ant XTech"
        />
      ),
      title: <FormattedMessage id="app.footer.more-product" />,
      items: [
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              alt="yuque"
            />
          ),
          title: <FormattedMessage id="app.footer.comingsoon" />,
          description: <FormattedMessage id="app.footer.continuous.development" />,
          openExternal: true,
        },
      ],
    };

    return [col1, col2, col3];
  }

  handleColorChange = (color: string) => {
    const {
      intl: { messages },
    } = this.props;
    message.loading({
      content: messages['app.footer.primary-color-changing'],
      key: 'change-primary-color',
    });
    const changeColor = () => {
      (window as any).less
        .modifyVars({
          '@primary-color': color,
        })
        .then(() => {
          message.success({
            content: messages['app.footer.primary-color-changed'],
            key: 'change-primary-color',
          });
          this.setState({ color });
        });
    };

    const lessUrl = 'https://gw.alipayobjects.com/os/lib/less/3.10.3/dist/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true,
        javascriptEnabled: true,
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  };

  renderThemeChanger() {
    const { color } = this.state;
    const colors = Object.keys(presetPalettes).filter(item => item !== 'grey');
    return (
      <ColorPicker
        small
        color={color}
        position="top"
        presetColors={[
          ...colors.map(c => presetPalettes[c][5]),
          ...colors.map(c => presetPalettes[c][4]),
          ...colors.map(c => presetPalettes[c][6]),
        ]}
        onChangeComplete={this.handleColorChange}
      />
    );
  }

  render() {
    return (
      <RcFooter
        columns={this.getColumns()}
        bottom={
          <>
            Made with <span style={{ color: '#fff' }}>❤</span> by
            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://xtech.antfin.com">
              <FormattedMessage id="app.footer.company" />
            </a>
          </>
        }
      />
    );
  }
}

export default injectIntl(Footer);
