import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { Box } from "@mui/material";
import axios from "axios";
import { Link } from "@nextui-org/react";
import { UseNodeContext } from "../Address/GraphContext";
import { truncateLabel } from "../Address/truncateLabel";
import Tooltip from "@mui/material/Tooltip";
import EastIcon from "@mui/icons-material/East";
const EdgeTable = () => {
  const { NodeID, EdgeID, NodeTableData, EdgeTableData, AllTransactions } =
    UseNodeContext();
  return (
    <div className="">
      <div className="text-base mb-3">Transaction Details</div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex justify-center items-center">
          <Link
            href={`/address/${EdgeID[1]}`}
            className="font-bold text-xl my-1 break-all"
          >
            <Tooltip title={EdgeID[1]}>{truncateLabel(EdgeID[1])}</Tooltip>
          </Link>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <EastIcon
            fontSize="medium"
            style={{ verticalAlign: "middle", margin: "0 4px" }}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Link
            href={`/address/${EdgeID[2]}`}
            className="font-bold text-xl my-1 break-all"
          >
            <Tooltip title={EdgeID[2]}>{truncateLabel(EdgeID[2])}</Tooltip>
          </Link>
        </div>
      </div>
      <div className="divider"></div>
      <table className="table rounded-xl bg-base-100 w-full">
        <tbody className="">
          <tr>
            <th>Transactions</th>
            <td className="text-right break-all">
              {EdgeTableData.transactions}
            </td>
          </tr>
          <tr>
            <th>Transaction volume</th>
            <td className="text-right break-all">
              {EdgeTableData.totalValue} USDT
            </td>
          </tr>
          <tr>
            <th>First txn time</th>
            <td className="text-right break-all">{EdgeTableData.newest}</td>
          </tr>
          <tr>
            <th>Latest txn time</th>
            <td className="text-right break-all">{EdgeTableData.latest}</td>
          </tr>
        </tbody>
      </table>
      <div className="divider"></div>
      <div className="text-lg">Transactions List</div>
      <div className="table-container overflow-scroll mt-5 h-40 lg:h-48 xl:h-64 rounded-xl">
        <table className="table rounded-xl bg-base-100 w-full">
          <thead>
            <tr>
              <th>Time/Hash</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {AllTransactions.map((transaction) => (
              <tr key={transaction.hash}>
                <td>
                  {new Date(
                    transaction.block_timestamp * 1000
                  ).toLocaleString()}
                  <div>
                    <Link href={`/txn/${transaction.hash}`}>
                      <Tooltip title={transaction.hash}>
                        {truncateLabel(transaction.hash)}
                      </Tooltip>
                    </Link>
                  </div>
                </td>
                <td>{transaction.value} USDT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EdgeTable;
