import React, { FC, useEffect, useContext, useState, Dispatch, SetStateAction } from 'react';
import {
  SourceContext,
  ComponentProps,
  SourceUpdaterContext,
} from '@/components/componentEditor/index';
import useField from '@/components/propsEditor/useField';
import GroupField from '@/components/propsEditor/groupField';
import { Button, Radio, Checkbox } from 'antd';
import ColumnsEditor from '@/components/propsEditor/columnsEdit';
import CodeLinkWrapper, { CodeLinkContext } from '@/components/propsEditor/CodeLinkWrapper';

const QueryContent = ({
  setContentValue,
  type,
}: {
  setContentValue?: Dispatch<SetStateAction<{}>>;
  type?: { field: string };
}) => {
  useEffect(() => {
    setContentValue!({
      buttons: { reset: true },
    });
  }, []);
  function onChange(checkedValues: any[]) {
    setContentValue!({
      buttons: checkedValues.map(k => ({ [k]: true })).reduce((p, n) => ({ ...p, ...n }), {}),
    });
  }
  switch (type!.field) {
    case 'single':
      return <>Single</>;
    case 'form':
      return (
        <div>
          <Checkbox.Group
            options={[{ label: '重置', value: 'reset' }]}
            defaultValue={['reset']}
            onChange={onChange}
          />
        </div>
      );
    default:
      return <div>Type为空</div>;
  }
};

export interface TableEditorProps extends ComponentProps {}
const TableEditor: FC<TableEditorProps> = () => {
  const [baseDirEditor, baseDir] = useField('源码位置');
  const [nameEditor, name] = useField('业务前缀');
  // const { baseDir, name } = useContext(SourceContext);
  const [updateToken, setUpdateAll] = useState({ buttons: { reset: true } });
  const { updateSource } = useContext(SourceUpdaterContext);
  return (
    <SourceContext.Provider value={{ baseDir, name }}>
      <div>
        <Button onClick={() => setUpdateAll({})}>刷新全部</Button>
      </div>
      {baseDirEditor} {nameEditor}
      <div>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource('session01', 'table@chad', 'query', data, baseDir);
          }}
          label="查询"
          field="query"
          toggleable
          types={[
            { label: '单项查询', field: 'single' },
            { label: '表单查询', field: 'form' },
          ]}
        >
          <QueryContent />
        </GroupField>
        <GroupField
          updateToken={updateToken}
          onChange={data => {
            updateSource('session01', 'table@chad', 'batchOperations', data, baseDir);
          }}
          label="批量操作"
          field="batchOperations"
          toggleable
        />
      </div>
    </SourceContext.Provider>
  );
};

export default TableEditor;
