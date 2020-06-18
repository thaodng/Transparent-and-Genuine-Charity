import React from 'react';
import { Table } from 'react-bootstrap'

const DonorsTable = () => {
  return (
      <div className="row">
        <div className="col-12">
          <Table responsive hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Eth address</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 wei</td>
                <td className="text-primary font-weight-bold text-center"><i className="fas fa-check"></i> </td>
              </tr>
              <tr>
                <td>2</td>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 wei</td>
                <td className="text-primary font-weight-bold text-center"><i className="fas fa-check"></i> </td>
              </tr>
              <tr>
                <td>3</td>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 wei</td>
                <td className="text-primary font-weight-bold text-center"><i className="fas fa-check"></i> </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
  )
}

export default DonorsTable
