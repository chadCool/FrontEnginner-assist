import React, { useState, useEffect, useCallback, FC } from 'react';
import { Button, Alert } from 'antd';
import { Intent } from 'octopus-end-web';

export interface ICodeLinkContext {
  linkToSource: (filePath: string) => void;
}
export const CodeLinkContext = React.createContext<ICodeLinkContext>({
  linkToSource: () => {
    console.warn('linkToSource尚未初始化');
  },
});
const CodeLinkWrapper: FC<any> = ({ children }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [execLinker, setExecLinker] = useState();

  function reconnect() {
    setExecLinker(new Intent('execLinker'));
  }
  // codeChanger.next('data/xxx', JSON.stringify({ checkedValues }));
  useEffect(() => {
    reconnect();
  }, []);
  const linkToSource = useCallback(
    (filePath: string) => {
      if (execLinker) {
        execLinker.next(
          'exec/0.1',
          JSON.stringify({
            cmd: `webstorm.exe ${filePath}`, // TODO: 根据不同的平台， 指定不同的可执行文件
          }),
        );
      }
    },
    [execLinker],
  );
  useEffect(() => {
    let subscription: any;
    if (execLinker) {
      subscription = execLinker.getStatusSubject().subscribe(
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
  }, [execLinker]);

  return (
    <CodeLinkContext.Provider value={{ linkToSource }}>
      <div>
        {!status && (
          <>
            <Alert message="exec连接中断" banner />
            <Button type="primary" onClick={reconnect}>
              重新连接
            </Button>
          </>
        )}
        {children}
      </div>
    </CodeLinkContext.Provider>
  );
};

export default CodeLinkWrapper;
