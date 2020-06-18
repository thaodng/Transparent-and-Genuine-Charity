import React from 'react';
import { Table } from 'react-bootstrap'

const DonorsTable = ({ members }) => {

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
            {
              members.map(({ member, value }, index) =>
                <tr key={member + index}>
                  <td>{index}</td>
                  <td><a href={`https://rinkeby.etherscan.io/address/${member}`}>{member} </a></td>
                  <td>{value / 1000000000000000000} eth</td>
                  <td className="text-primary font-weight-bold text-center"><i className="fas fa-check"></i> </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DonorsTable
