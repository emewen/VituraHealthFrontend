import React from 'react'
import { ParentTable } from './Components/ParentTable'
//import type { ParentRowData } from './types'
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  // const tableData: ParentRowData[] = [
  //   {
  //     parentId: '1',
  //     parentName: 'Order A',
  //     total: 150,
  //     children: [
  //       { childId: '1a', parentId: '1', childName: 'Product X', quantity: 2 },
  //       { childId: '1b', parentId: '1', childName: 'Product Y', quantity: 1 },
  //     ],
  //   },
  //   {
  //     parentId: '2',
  //     parentName: 'Order B',
  //     total: 75,
  //     children: [{ childId: '2a', parentId: '2', childName: 'Product Z', quantity: 3 }],
  //   },
  // ]

  return (
    <div style={{width: 600, verticalAlign:'top'}}>
      <h1>Patients</h1>
      <ParentTable data={[]} />
    </div>
  )
}

export default App
