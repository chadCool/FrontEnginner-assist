import React, { FC, useEffect, useState } from 'react';
import { Collapse, Radio, Switch } from 'antd';
import styles from './groupField.less';

const { Panel } = Collapse;

interface GroupFieldProps {
  updateToken: {};
  field: string;
  label: string;
  toggleable?: boolean;
  types?: { label: string; field: string }[];
  onChange: (data: any) => void;
}

const GroupField: FC<GroupFieldProps> = ({
  updateToken,
  field,
  label,
  toggleable = false,
  types,
  onChange,
  children,
}) => {
  const [enable, setEnable] = useState(true);
  const [activeKey, setActiveKey] = useState([field]);
  const [type, setType] = useState<{ label: string; field: string } | undefined>(
    types ? types[0] : undefined,
  );
  const [contentValue, setContentValue] = useState({});
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
          value={type!.field}
          onChange={e => setType(types.find(t => t.field === e.target.value))}
        >
          {types.map(t => (
            <Radio.Button key={t.field} value={t.field}>
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
      onChange({ enable, type: type ? type.field : undefined, ...contentValue });
    } else {
      onChange({ enable });
    }
  }, [enable, type, updateToken, contentValue]);
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
          {React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement, { setContentValue, type }),
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default GroupField;
