<<<<<<< HEAD
import React, { FC, useEffect, useContext, useState, Dispatch, SetStateAction } from 'react';
=======
import React, { FC, useContext } from 'react';
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
import {
  SourceContext,
  ComponentProps,
  SourceUpdaterContext,
} from '@/components/componentEditor/index';
import useField from '@/components/propsEditor/useField';
import GroupField from '@/components/propsEditor/groupField';
<<<<<<< HEAD
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
=======

export interface TableEditorProps extends ComponentProps {}
const TableView: FC<TableEditorProps> = ({}) => {
  const [baseDirEditor, baseDir] = useField('源码位置');
  const [nameEditor, name] = useField('业务前缀');
  // const { baseDir, name } = useContext(SourceContext);
  const { updateSource } = useContext(SourceUpdaterContext);
  return (
    <SourceContext.Provider value={{ baseDir, name }}>
      {baseDirEditor} {nameEditor}
      <div>
        <GroupField
          onChange={() => {}}
          label="列"
          field="columns"
          content={() => <>The Columns</>}
        />
        <GroupField
          onChange={data => {
            updateSource('table@chad', 'query', data, baseDir);
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
          }}
          label="查询"
          field="query"
          toggleable
          types={[
<<<<<<< HEAD
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
=======
            { label: '单项查询', filed: 'single' },
            { label: '表单查询', filed: 'form' },
          ]}
          content={type => (
            <>
              {type!.filed} {type!.label}
            </>
          )}
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
        />
      </div>
    </SourceContext.Provider>
  );
};

<<<<<<< HEAD
export default TableEditor;
=======
export default TableView;
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
