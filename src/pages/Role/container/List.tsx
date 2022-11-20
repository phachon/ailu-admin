import React, { useEffect, useState } from 'react';
import { initPagination } from '../../../store/states/adminState';
import { RoleInfoType, RoleListType } from '../../../store/types/roleType';
import { RoleService } from '../../../services/Role';
import { message, Modal, TablePaginationConfig } from 'antd';
import RoleListUI from '../component/ListUI';
import RoleSearchUI from '../component/SearchUI';
import RoleFormUI from '../component/FormUI';

const RoleList: React.FC = () => {
  const [roleList, setRoleList] = useState<RoleInfoType[]>([]);
  const [pagination, setPagination] = useState(initPagination);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editRoleInfo, setEditRoleInfo] = useState<RoleInfoType>();
  const [searchKeyWords, setSearchKeywords] = useState({});

  useEffect(() => {
    getRoleList(initPagination, {});
  }, []);

  /**
   * 列表分页处理
   * @param pageConfig
   * @param filters
   * @param sorter
   */
  const listChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
    getRoleList(pageConfig, searchKeyWords);
  };

  /**
   * 修改点击操作
   * @param roleInfo
   */
  const editClickCallback = (roleInfo: RoleInfoType) => {
    setEditRoleInfo(roleInfo);
    setEditModalVisible(true);
  };

  /**
   * 修改弹框取消
   */
  const editModalCancel = () => {
    setEditModalVisible(false);
  };

  /**
   * 修改保存操作
   * @param roleInfo
   */
  const editFinishCallback = (roleInfo: RoleInfoType) => {
    RoleService.roleUpdate(roleInfo.role_id, roleInfo.name)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalVisible(false);
          getRoleList(pagination, searchKeyWords);
        });
      })
      .catch(() => {
        message.error('修改失败', 2);
      });
  };

  /**
   * 确认删除操作
   * @param roleInfo
   */
  const deleteConfirmCallback = (roleInfo: RoleInfoType) => {
    RoleService.roleDelete(roleInfo.role_id)
      .then(() => {
        message.success('删除成功', 2, () => {
          getRoleList(pagination, searchKeyWords);
        });
      })
      .catch(() => {
        message.error('修改失败', 2);
      });
  };

  /**
   * 搜索查询操作
   * @param values
   */
  const searchChangeCallback = (values: any) => {
    getRoleList(initPagination, values);
  };

  /**
   * 搜索重置操作
   */
  const searchResetCallback = () => {
    getRoleList(initPagination, {});
  };

  /**
   * 获取角色列表
   * @param pagination
   * @param searchKeyWords
   */
  const getRoleList = (pagination: TablePaginationConfig, searchKeyWords: {}) => {
    const pageSize = pagination.pageSize;
    const current = pagination.current;
    RoleService.roleList(pageSize, current, searchKeyWords).then((roleList: RoleListType) => {
      setRoleList(roleList.list);
      setSearchKeywords(searchKeyWords);
      setPagination({
        ...initPagination,
        current: roleList.page_info?.page_num,
        pageSize: roleList.page_info?.page_size,
        total: roleList.page_info?.total_num,
      });
    });
  };

  return (
    <div className="panel">
      <RoleSearchUI
        searchChangeCallback={searchChangeCallback}
        searchResetCallback={searchResetCallback}
      />
      <RoleListUI
        listLoading={false}
        pagination={pagination}
        roleList={roleList}
        listChangeCallback={listChangeCallback}
        editClickCallback={editClickCallback}
        deleteCallback={deleteConfirmCallback}
      />
      <Modal
        title="角色修改"
        width={570}
        visible={editModalVisible}
        onCancel={editModalCancel}
        footer={null}
      >
        <RoleFormUI roleInfo={editRoleInfo} onFinishCallback={editFinishCallback} />
      </Modal>
    </div>
  );
};

export default RoleList;
