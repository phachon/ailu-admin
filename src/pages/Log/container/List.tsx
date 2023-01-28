import React, { useEffect, useState } from 'react';
import { initPagination } from '../../../store/states/adminState';
import { message, TablePaginationConfig } from 'antd';
import LogListUI from '../component/ListUI';
import LogSearchUI from '../component/SearchUI';
import { LogInfoType, LogKeywords, LogListType } from '../../../store/types/logType';
import { LogService } from '../../../services/Log';

let searchKeyWords: LogKeywords = {};
let accountListLogInfo: LogInfoType; // 账号列表日志信息

const LogList: React.FC = () => {
  const [logList, setLogList] = useState<LogInfoType[]>([]);
  const [pagination, setPagination] = useState(initPagination);

  useEffect(() => {
    getLogList(initPagination, {});
  }, []);

  /**
   * 列表分页处理
   * @param pageConfig
   * @param filters
   * @param sorter
   */
  const logListChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
    getLogList(pageConfig, searchKeyWords);
  };

  /**
   * 搜索查询操作
   * @param values
   */
  const searchChangeCallback = (values: LogKeywords) => {
    getLogList(initPagination, values);
  };

  /**
   * 搜索重置操作
   */
  const searchResetCallback = () => {
    getLogList(initPagination, {});
  };

  /**
   * 获取日志列表
   * @param pagination
   * @param searchValues
   */
  const getLogList = (pagination: TablePaginationConfig, searchValues: LogKeywords) => {
    const pageSize = pagination.pageSize;
    const current = pagination.current;
    searchKeyWords = searchValues;
    LogService.logList(pageSize, current, searchValues)
      .then((logList: LogListType) => {
        setLogList(logList.list);
        setPagination({
          ...initPagination,
          current: logList.page_info?.page_num,
          pageSize: logList.page_info?.page_size,
          total: logList.page_info?.total_num,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="panel">
      <LogSearchUI
        searchChangeCallback={searchChangeCallback}
        searchResetCallback={searchResetCallback}
      />
      <LogListUI
        listLoading={false}
        pagination={pagination}
        logList={logList}
        listChangeCallback={logListChangeCallback}
      />
    </div>
  );
};

export default LogList;
