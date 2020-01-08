import React from 'react';
// import Div from './Div';

export interface ComponentProps {
  id: string;
}

/**
 * 告知弹出层， 谁要添加， 可选的种类, 其他相关的参数, 获取待添加内容的回调
 */
export interface HandleAdd {
  (
    parent: ComponentProps,
    filter: () => boolean,
    onResult: (result?: ComponentProps) => void,
  ): void;
}
export interface ISourceContext {
  baseDir?: string;
  name?: string;
}

export interface ISourceUpdaterContext {
  updateSource: (
    session: string,
    template: string,
    dataKey: string,
    data: any,
    destDir: string,
    options?: { [propsName: string]: any },
  ) => void;
}

// source updater
export const SourceContext = React.createContext<ISourceContext>({});
function logEmpty(session: string, template: string, dataKey: string, data: any, destDir: string) {
  console.error('SourceContext.updateSource 尚未初始化', session, template, dataKey, data, destDir);
}
export const SourceUpdaterContext = React.createContext<ISourceUpdaterContext>({
  updateSource: logEmpty,
});
