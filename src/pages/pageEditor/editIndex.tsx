// import React, { useState, useEffect } from 'react';
// import { Intent } from 'octopus-end-web';
// import { Button, Checkbox, Row, Col } from 'antd';
//
// const dataTester = new Intent('test');
//
// function onChange(checkedValues) {
//   // console.log('checked = ', checkedValues);
//   dataTester.next('data/xxx', JSON.stringify({ checkedValues }));
// }
//
// export default (): React.ReactNode => {
//   const [status, setStatus] = useState<boolean>();
//   useEffect(() => {
//     const subscription = dataTester.getStatusSubject().subscribe(
//       s => setStatus(s),
//       () => setStatus(false),
//       () => setStatus(false),
//     );
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);
//   return (
//     <div>
//       <Button
//         disabled={!status}
//         onClick={() => {
//           dataTester.next('data/xxx', `hello world ${Math.random()}`);
//         }}
//       >
//         测试按钮
//       </Button>
//       <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
//         <Row>
//           <Col span={4}>
//             <Checkbox value="A">A</Checkbox>
//           </Col>
//           <Col span={4}>
//             <Checkbox value="B">B</Checkbox>
//           </Col>
//           <Col span={4}>
//             <Checkbox value="C">C</Checkbox>
//           </Col>
//           <Col span={4}>
//             <Checkbox value="D">D</Checkbox>
//           </Col>
//           <Col span={4}>
//             <Checkbox value="E">E</Checkbox>
//           </Col>
//         </Row>
//       </Checkbox.Group>
//     </div>
//   );
// };
