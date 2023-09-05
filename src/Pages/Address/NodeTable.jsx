import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/NodeContext";
const NodeTable = () => {
  const { NodeID } = UseNodeContext();
  return (
    <div className="">
      <div className="text-base">Address Details</div>
      <div className="text-blue-700 font-bold text-2xl my-1 break-all">
        {NodeID}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Chip color="primary">#tag1</Chip>
        <Chip color="secondary">#tag2</Chip>
        <Chip color="success">#tag3</Chip>
        <Chip color="warning">#tag4</Chip>
        <Chip color="danger">#tag5</Chip>
      </div>
      <div class="divider"></div>
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
