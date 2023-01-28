import { Table, TablePaginationConfig, Tag } from 'antd';
import { LogInfoType } from '../../../store/types/logType';

interface LogListUIProps {
  listLoading: boolean;
  logList: LogInfoType[];
  pagination: TablePaginationConfig;
  listChangeCallback: (pageConfig: TablePaginationConfig, filters: any, sorter: any) => void;
}

/**
 * 日志级别UI组件
 * @param level
 * @returns
 */
export const LevelTagUI = (level: number) => {
  switch (level) {
    case 0:
      return <Tag color="cyan">Unkown</Tag>;
    case 1:
      return <Tag color="success">Trace</Tag>;
    case 2:
      return <Tag color="purple">Debug</Tag>;
    case 3:
      return <Tag color="blue">Info</Tag>;
    case 4:
      return <Tag color="warning">Warn</Tag>;
    case 5:
      return <Tag color="red">Error</Tag>;
    case 6:
      return <Tag color="magenta">Fatal</Tag>;
    default:
      return <Tag color="cyan">Unkown</Tag>;
  }
};

/**
 * 日志列表 UI 组件
 * @param props
 * @returns
 */
const LogListUI = (props: LogListUIProps) => {
  return (
    <div className="panel-body">
      <Table
        rowKey={'log_id'}
        bordered={true}
        dataSource={props.logList}
        loading={props.listLoading}
        pagination={props.pagination}
        onChange={props.listChangeCallback}
        footer={() => null}
      >
        <Table.Column
          title={'日志ID'}
          dataIndex="log_id"
          width={80}
          key={'log_id'}
          align={'center'}
        />
        <Table.Column
          title={'账号'}
          dataIndex="account_id"
          key={'account_id'}
          width={250}
          render={(accountId: bigint, logInfo: LogInfoType) => (
            <div>
              {logInfo.account_name}（{logInfo.account_id.toString()}）
            </div>
          )}
        />
        <Table.Column title={'日志内容'} dataIndex="message" key={'message'} />
        <Table.Column
          title={'日志级别'}
          dataIndex="level"
          key={'level'}
          width={120}
          align={'center'}
          render={LevelTagUI}
        />
        <Table.Column
          title={'创建时间'}
          dataIndex="create_time"
          key={'create_time'}
          width={200}
          align={'center'}
        />
      </Table>
    </div>
  );
};

export default LogListUI;
