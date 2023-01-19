import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import PrivilegeFormUI from '../component/FormUI';
import PrivilegeListTreeUI from '../component/ListTreeUI';

const PrivilegeList: React.FC = () => {
  const [privilegeList, setPrivilegeList] = useState<PrivilegeListItemType[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrivilegeInfo, setEditPrivilegeInfo] = useState<PrivilegeInfoType>();

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
    setEditPrivilegeInfo(privilegeInfo);
    setEditModalOpen(true);
  };

  /**
   * 删除点击操作
   * @param privilegeInfo 权限信息
   */
  const deleteClickCallback = (privilegeInfo: PrivilegeInfoType) => {
    PrivilegeService.deletePrivilege(privilegeInfo)
      .then(() => {
        message.success('删除成功', 2, () => {
          getPrivilegeList();
        });
      })
      .catch(e => {
        console.log('删除权限失败：', e);
      });
  };

  /**
   * 修改保存操作
   * @param privilegeInfo 权限信息
   */
  const editFinishCallback = (privilegeInfo: PrivilegeInfoType) => {
    PrivilegeService.modifyPrivilege(privilegeInfo)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalOpen(false);
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
    setEditModalOpen(false);
  };

  return (
    <>
      <PrivilegeListTreeUI
        privilegeList={privilegeList}
        editClickCallback={editClickCallback}
        deleteClickCallback={deleteClickCallback}
      />
      <Modal
        title="权限修改"
        width={670}
        open={editModalOpen}
        onCancel={editModalCancel}
        footer={null}
      >
        <PrivilegeFormUI
          privilegeInfo={editPrivilegeInfo}
          onFinishCallback={editFinishCallback}
          privilegeList={privilegeList}
        />
      </Modal>
    </>
  );
};

export default PrivilegeList;
