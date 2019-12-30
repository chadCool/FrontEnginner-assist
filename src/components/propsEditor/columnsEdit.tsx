import React, { FC } from 'react';
import { Table, Input, Button } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let dragingIndex = -1;

interface BodyRowProps {
  isOver: boolean;
  connectDragSource: any;
  connectDropTarget: any;
  moveRow: any;
  style: {};
  className: string;
  index: number;
}

const BodyRow: FC<BodyRowProps> = ({
  isOver,
  connectDragSource,
  connectDropTarget,
  moveRow,
  ...restProps
}) => {
  const style = { ...restProps.style, cursor: 'move' };

  let { className } = restProps;
  if (isOver) {
    if (restProps.index > dragingIndex) {
      className += ' drop-over-downward';
    }
    if (restProps.index < dragingIndex) {
      className += ' drop-over-upward';
    }
  }

  return connectDragSource(
    connectDropTarget(<tr {...restProps} className={className} style={style} />),
  );
};

const rowSource = {
  beginDrag(props: { index: number }) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

const columns = [
  {
    title: 'label',
    dataIndex: 'label',
    key: 'label',
    fixed: 'left',
    render: (data: string) => <input value={data} />,
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'placeHolder',
    dataIndex: 'placeHolder',
    key: 'placeHolder',
    render: (data: string) => <input value={data} />,
  },
  {
    title: 'operation',
    fixed: 'right',
    dataIndex: 'operation',
    key: 'operation',
    render: () => {
      return <Button type="link">删除</Button>;
    },
  },
];

class ColumnsEditor extends React.Component {
  state = {
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ],
  };

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex: number, hoverIndex: number) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      }),
    );
  };

  render() {
    const { Search } = Input;
    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <Search
            enterButton="添加"
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
    );
  }
}

export default ColumnsEditor;
