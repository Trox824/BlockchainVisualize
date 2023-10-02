import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { Link } from "@nextui-org/react";
const Hash = () => {
  const { hash } = useParams(); // Get the hash parameter from the URL
  const [txnData, setTxnData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Similar utility function for converting timestamps
  const convertTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/transaction/${hash}`
        );
        const { response: txntable } = response.data;

        setTxnData(txntable);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hash data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hash]);
  return (
    <div className="mt-10">
      <div className="text-2xl font-bold">Transaction Details</div>
      <div className="font-bold text-lg my-1 break-all">
        Txn Hash:{" "}
        <Link className="text-lg" key={hash} href={`/txn/${hash}`}>
          {hash}
        </Link>
      </div>

      <div className="divider"></div>

      {/* Similar layout for displaying transaction-related data */}
      <div className="bg-base-200 shadow-xl rounded-xl w-1/2 justify-center item-center mb-10 p-2 m-auto">
        <table className="table rounded-xl bg-base-100">
          <tbody className="">
            <tr>
              <th>From Address</th>
              <td className="text-right break-all">
                {txnData.map((data) => (
                  <Link
                    key={data.from_address}
                    href={`/Address/${data.from_address}`}
                  >
                    {data.from_address}
                  </Link>
                ))}
              </td>
            </tr>
            <tr>
              <th>To Address</th>
              <td className="text-right break-all">
                {txnData.map((data) => (
                  <Link
                    key={data.to_address}
                    href={`/Address/${data.to_address}`}
                  >
                    {data.to_address}
                  </Link>
                ))}
              </td>
            </tr>
            <tr>
              <th>Time</th>
              <td className="text-right break-all">
                {convertTimestampToDateTime(
                  txnData.map((data) => data.block_timestamp)
                )}
              </td>
            </tr>
            <tr>
              <th>Timestamp</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.block_timestamp)}
              </td>
            </tr>
            <tr>
              <th>Value</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.value)}
              </td>
            </tr>
            <tr>
              <th>Input</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.input)}
              </td>
            </tr>
            <tr>
              <th>Transaction Index</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.transaction_index)}
              </td>
            </tr>
            <tr>
              <th>Gas</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.gas)}
              </td>
            </tr>
            <tr>
              <th>Gas Used</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.gas_used)}
              </td>
            </tr>
            <tr>
              <th>Gas Price</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.gas_price)}
              </td>
            </tr>
            <tr>
              <th>Transaction Fee</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.transaction_fee)}
              </td>
            </tr>
            <tr>
              <th>Block Number</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.block_number)}
              </td>
            </tr>
            <tr>
              <th>Block Hash</th>
              <td className="text-right break-all">
                {txnData.map((data) => data.block_hash)}
              </td>
            </tr>

            {/* Add more properties here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hash;
