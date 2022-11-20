import React from 'react';
import { message } from 'antd';
import { ProfileService } from '../../../services/Profile';
import ProfileInfoUI from '../component/InfoUI';
import { getProfileAccountInfo, setProfileAccountInfo } from '../../../store/local';
import { ProfileInfoType } from '../../../store/types/profileType';

const ProfileInfo: React.FC = () => {
  const accountInfo = getProfileAccountInfo();
  let profileInfo: ProfileInfoType | undefined;
  if (accountInfo) {
    profileInfo = { account_info: accountInfo };
  }

  /**
   * 修改个人资料操作
   * @param values
   */
  const onFinishCallback = (values: any) => {
    ProfileService.profileUpdate(values)
      .then(() => {
        // 更新 local
        setProfileAccountInfo(values);
        message.success('保存成功', 1);
      })
      .catch(e => {
        console.log(e);
        message.error('保存失败');
      });
  };

  return (
    <div className="pdt24">
      <ProfileInfoUI profileInfo={profileInfo} onFinishCallback={onFinishCallback} />
    </div>
  );
};

export default ProfileInfo;
