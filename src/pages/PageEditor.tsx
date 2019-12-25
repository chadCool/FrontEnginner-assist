import React, { useState, useEffect } from 'react';
import { Intent } from 'octopus-end-web';
import { Button } from 'antd';

const dataTester = new Intent('test');

export default (): React.ReactNode => {
  const [status, setStatus] = useState<boolean>();
  useEffect(() => {
    const subscription = dataTester.getStatusSubject().subscribe(
      s => setStatus(s),
      () => setStatus(false),
      () => setStatus(false),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <Button
      disabled={!status}
      onClick={() => {
        dataTester.next('data/xxx', `hello world ${Math.random()}`);
      }}
    >
      测试按钮
    </Button>
  );
};
