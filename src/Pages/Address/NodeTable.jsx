import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";
const NodeTable = () => {
  const { NodeID } = UseNodeContext();
  return (
    <div className="">
      <div className="text-base">Address Details</div>
      <div className="font-bold text-2xl my-1 break-all">
        <Link className="font-bold text-xl my-1 break-all" href="#">
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
            <th>To/From addresses</th>
            <td className="text-right">7/123</td>
          </tr>
          <tr>
            <th>Current balance</th>
            <td className="text-right">185 USDT</td>
          </tr>
          <tr>
            <th>First txn time</th>
            <td className="text-right">12/31/2021, 19:12:27</td>
          </tr>
          <tr>
            <th>Transactions</th>
            <td className="text-right">1,129</td>
          </tr>
          <tr>
            <th>Maximum txn amount</th>
            <td className="text-right">330,000 USDT</td>
          </tr>
          <tr>
            <th>Total received</th>
            <td className="text-right">4,794,991.1506 USDT</td>
          </tr>
          <tr>
            <th>Total sent</th>
            <td className="text-right">4,794,806.1506 USDT</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default NodeTable;
