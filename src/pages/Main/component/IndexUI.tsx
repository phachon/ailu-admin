import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

interface MainIndexUIProps {}

/**
 * 默认主页 UI 组件
 * @param props
 * @returns
 */
const MainIndexUI = (props: MainIndexUIProps) => {
  return (
    <div className="panel-body">
      <Alert
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            公告：xxxxxxxxxxxx
          </Marquee>
        }
      />
    </div>
  );
};

export default MainIndexUI;
