import React from "react";
import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create links
import { UseNodeContext } from "../Address/GraphContext";

const NodeTable = () => {
  const { NodeID } = UseNodeContext();
  const { NodeTableData } = UseNodeContext();

  return (
    <div className="">
      <div className="text-base">Address Details</div>
      <div className="font-bold text-2xl my-1 break-all">
        {/* Use Link component to create a link to the address page */}
        <Link
          className="font-bold text-xl my-1 break-all"
          to={`/address/${NodeID[0]}`} // Specify the route parameter here
        >
          {NodeID[0]}
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Chip color="success">{NodeID[1]}</Chip>
      </div>
      <div className="divider"></div>
      <table className="table rounded-xl bg-base-100 w-full">
        <tbody className="">
          <tr>
            <th>Current balance</th>
            <td className="text-right break-all">
              {NodeTableData.current_balance} USDT
            </td>
          </tr>
          <tr>
            <th>First txn time</th>
            <td className="text-right break-all">{NodeTableData.timestamp}</td>
          </tr>
          <tr>
            <th>Transactions</th>
            <td className="text-right break-all">
              {NodeTableData.transactions}
            </td>
          </tr>
          <tr>
            <th>Maximum txn amount</th>
            <td className="text-right break-all">
              {NodeTableData.max_transaction_value} USDT
            </td>
          </tr>
          <tr>
            <th>Total received</th>
            <td className="text-right break-all">
              {NodeTableData.total_received} USDT
            </td>
          </tr>
          <tr>
            <th>Total sent</th>
            <td className="text-right break-all">
              {NodeTableData.total_sent} USDT
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NodeTable;
