import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import PrivilegeFormUI from '../component/FormUI';
import PrivilegeListTreeUI from '../component/ListTreeUI';

const PrivilegeList: React.FC = () => {
  const [editForm] = Form.useForm();

  const [privilegeList, setPrivilegeList] = useState<PrivilegeListItemType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    getPrivilegeList();
  }, []);

  /**
   * 获取权限列表
   */
  const getPrivilegeList = () => {
    PrivilegeService.privilegeList().then(privilegeList => {
      setPrivilegeList(privilegeList.list);
    });
  };

  /**
   * 修改点击操作
   * @param privilegeInfo 权限信息
   */
  const editClickCallback = (privilegeInfo: PrivilegeInfoType) => {
    setEditModalVisible(true);
    privilegeInfo.display_switch = privilegeInfo.is_display === 1 ? true : false;
    editForm.setFieldsValue(privilegeInfo);
  };

  /**
   * 修改保存操作
   * @param privilegeInfo 权限信息
   */
  const editFinishCallback = (privilegeInfo: PrivilegeInfoType) => {
    PrivilegeService.privilegeUpdate(privilegeInfo)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalVisible(false);
          getPrivilegeList();
        });
      })
      .catch(e => {
        console.log(e);
        message.error('修改失败', 2);
      });
  };

  /**
   * 修改取消弹窗
   */
  const editModalCancel = () => {
    setEditModalVisible(false);
  };

  return (
    <>
      <PrivilegeListTreeUI privilegeList={privilegeList} editClickCallback={editClickCallback} />
      <Modal
        title="权限修改"
        width={670}
        visible={editModalVisible}
        onCancel={editModalCancel}
        footer={null}
      >
        <PrivilegeFormUI
          formInstance={editForm}
          isEdit={true}
          onFinishCallback={editFinishCallback}
          privilegeList={privilegeList}
        />
      </Modal>
    </>
  );
};

export default PrivilegeList;
