import React from 'react'
import web3 from '../contracts/web3';

const RequestTable = ({ requests, donorsCount, onCallback, isAuthenticated, loading }) => {

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-bordered text-center table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Recipient Address</th>
              <th scope="col">Amount</th>
              <th scope="col">Approvals</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              requests.map((request, index) =>
                (
                  <tr key={request + index}>
                    <td>{index}</td>
                    <td>{request.description}</td>
                    <td>
                      <a href={`https://rinkeby.etherscan.io/address/${request.recipient}`}>{request.recipient} </a>
                    </td>
                    <td>{web3.utils.fromWei(request.value, 'ether')} eth</td>
                    <td>{request.approvalCount}/{donorsCount}</td>
                    {
                      request.completed
                        ? <td className="text-primary font-weight-bold text-center"><i className="fas fa-check"></i> </td>
                        : <td>Pending</td>
                    }
                    <td>
                      {
                        !request.completed &&
                        <div className="d-flex justify-content-around">
                          {
                            loading
                              ? <div className="text-right">
                                <div className="spinner-grow text-primary" role="status" />
                              </div>
                              :
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Accept request"
                                onClick={() => onCallback(index)}
                              >
                                {isAuthenticated ? 'Finalize' : 'Accept'}
                              </button>
                          }

                        </div>
                      }
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RequestTable
