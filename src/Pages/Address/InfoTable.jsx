const InfoTable = () => {
  return (
    <div className="">
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
export default InfoTable;
