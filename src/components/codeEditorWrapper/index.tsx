import React, { useState, useEffect, useCallback, FC } from 'react';
import { Card, Alert } from 'antd';
import { SourceUpdaterContext } from '@/components/componentEditor';
import { Intent } from 'octopus-end-web';
import styles from './index.less';

const CodeEditorWrapper: FC<any> = ({ children }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [codeChanger, setCodeChanger] = useState();

  function reconnect() {
    setCodeChanger(new Intent('codeChanger'));
  }
  // codeChanger.next('data/xxx', JSON.stringify({ checkedValues }));
  useEffect(() => {
    reconnect();
  }, []);
  const genCode = useCallback(
    (
      session: string,
      template: string,
      dataKey: string,
      data: any,
      targetDir: string,
      options: { [propsName: string]: any } = {},
    ) => {
      if (codeChanger) {
        codeChanger.next(
          'data/xxx',
          JSON.stringify({ session, template, dataKey, data, targetDir, options }),
        );
      }
    },
    [codeChanger],
  );
  useEffect(() => {
    let subscription: any;
    if (codeChanger) {
      subscription = codeChanger.getStatusSubject().subscribe(
        s => {
          setStatus(s);
        },
        () => setStatus(false),
        () => setStatus(false),
      );
    }
    return () => {
      setStatus(true);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [codeChanger]);

  return (
    <SourceUpdaterContext.Provider value={{ updateSource: genCode }}>
      <div className={styles.root}>
        {!status && (
          <a onClick={reconnect}>
            <Alert message="连接中断, 点击重连。" banner />
          </a>
        )}
        <Card>{children}</Card>
      </div>
    </SourceUpdaterContext.Provider>
  );
};

export default CodeEditorWrapper;
