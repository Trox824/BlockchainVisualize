import Search from "./components/Search";

const App = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-200 shadow-xl rounded-xl my-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Group 3-7</a>
        </div>
        <div className="navbar-end">
          <Search />
        </div>
      </div>
      <div className="w-full grid h-80 card rounded-box place-items-center rounded-xl my-4">
        <table classname="my-auto">
          <tr>
            <th className="px-40 py-2 text-left">To/From addresses</th>
            <td className="px-40 py-2 text-right">7/123</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">Current balance</th>
            <td className="px-40 py-2 text-right">185USDT</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">First txn time</th>
            <td className="px-40 py-2 text-right">12/31/2021, 19:12:27</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">Transactions</th>
            <td className="px-40 py-2 text-right">1,129</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">Maximum txn amount</th>
            <td className="px-40 py-2 text-right">330,000USDT</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">Total received</th>
            <td className="px-40 py-2 text-right">4,794,991.1506USDT</td>
          </tr>
          <tr>
            <th className="px-40 py-2 text-left">Total sent</th>
            <td className="px-40 py-2 text-right">4,794,806.1506USDT</td>
          </tr>
        </table>
      </div>
      <div className=" divider"></div>
      <div className=" grid h-auto card rounded-box place-items-center bg-base-200 shadow-xl rounded-xl my-4 p-18">
        <div className="p-10">content</div>
      </div>
    </div>
  );
};

export default App;
