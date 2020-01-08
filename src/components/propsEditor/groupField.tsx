<<<<<<< HEAD
import React, { FC, useEffect, useState } from 'react';
=======
import React, { FC, useState, useEffect } from 'react';
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
import { Collapse, Radio, Switch } from 'antd';
import styles from './groupField.less';

const { Panel } = Collapse;

interface GroupFieldProps {
<<<<<<< HEAD
  updateToken: {};
  field: string;
  label: string;
  toggleable?: boolean;
  types?: { label: string; field: string }[];
=======
  field: string;
  label: string;
  toggleable?: boolean;
  types?: { label: string; filed: string }[];
  content: (type?: { label: string; filed: string }) => React.ReactNode;
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
  onChange: (data: any) => void;
}

const GroupField: FC<GroupFieldProps> = ({
<<<<<<< HEAD
  updateToken,
=======
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
  field,
  label,
  toggleable = false,
  types,
<<<<<<< HEAD
  onChange,
  children,
}) => {
  const [enable, setEnable] = useState(true);
  const [activeKey, setActiveKey] = useState([field]);
  const [type, setType] = useState<{ label: string; field: string } | undefined>(
    types ? types[0] : undefined,
  );
  const [contentValue, setContentValue] = useState({});
=======
  content,
  onChange,
}) => {
  const [enable, setEnable] = useState(true);
  const [activeKey, setActiveKey] = useState([field]);
  const [type, setType] = useState<{ label: string; filed: string } | undefined>(
    types ? types[0] : undefined,
  );
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
  const toggle = (check: boolean) => {
    setEnable(check);
    if (check) {
      setActiveKey(pre => [...pre, field]);
    } else {
      setActiveKey(pre => [...pre.filter(k => k !== field)]);
    }
  };
  const genExtra = () => (
    <span onClick={event => event.stopPropagation()}>
      {types && (
        <Radio.Group
          style={{ marginLeft: 16 }}
<<<<<<< HEAD
          value={type!.field}
          onChange={e => setType(types.find(t => t.field === e.target.value))}
        >
          {types.map(t => (
            <Radio.Button key={t.field} value={t.field}>
=======
          value={type!.filed}
          onChange={e => setType(types.find(t => t.filed === e.target.value))}
        >
          {types.map(t => (
            <Radio.Button key={t.filed} value={t.filed}>
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
              {t.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
      {toggleable && <Switch style={{ marginLeft: 16 }} checked={enable} onClick={toggle} />}
    </span>
  );
  useEffect(() => {
    if (enable) {
<<<<<<< HEAD
      onChange({ enable, type: type ? type.field : undefined, ...contentValue });
    } else {
      onChange({ enable });
    }
  }, [enable, type, updateToken, contentValue]);
=======
      onChange({ enable, type });
    } else {
      onChange({ enable });
    }
  }, [enable, type]);
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
  return (
    <div>
      <Collapse
        activeKey={activeKey}
        onChange={(keys: string[] | string) => setActiveKey(keys as string[])}
      >
        <Panel
          header={label}
          className={styles.wrapper}
          key={field}
          extra={genExtra()}
          disabled={!enable}
        >
<<<<<<< HEAD
          {React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement, { setContentValue, type }),
          )}
=======
          {content(type)}
>>>>>>> d5a87ffcab8dfded39e00112ac4340143369d43d
        </Panel>
      </Collapse>
    </div>
  );
};

export default GroupField;
