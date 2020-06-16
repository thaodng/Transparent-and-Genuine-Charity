import React from 'react'

const RequestTable = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Recipient Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Approvals</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 eth</td>
                <td>7/10</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>
                    <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i class="fas fa-check"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 eth</td>
                <td>7/10</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>
                    <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i class="fas fa-check"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>0x620837AE80B1033a1537a37E3e23725423169067</td>
                <td>0.5 eth</td>
                <td>7/10</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>
                    <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i class="fas fa-check"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RequestTable
