import React from 'react';
import { Table } from 'react-bootstrap'

const DonorsTable = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Table responsive hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Country</th>
                <th>Eth address</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Thao D. Nguyen</td>
                <td>Viet Nam</td>
                <td>0x1782330495372384abcdfadd34</td>
                <td>0.5 eth</td>
                <td class="text-primary font-weight-bold text-center"><i class="fas fa-check"></i> </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Thao D. Nguyen</td>
                <td>Viet Nam</td>
                <td>0x1782330495372384abcdfadd34</td>
                <td>0.5 eth</td>
                <td class="text-primary font-weight-bold text-center"><i class="fas fa-check"></i> </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Thao D. Nguyen</td>
                <td>Viet Nam</td>
                <td>0x1782330495372384abcdfadd34</td>
                <td>0.5 eth</td>
                <td class="text-primary font-weight-bold text-center"><i class="fas fa-check"></i> </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default DonorsTable
