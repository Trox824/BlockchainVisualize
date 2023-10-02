import React from "react";

const Documentation = () => {
  return (
    <div>
      <div className="mt-10 p-6">
        <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
        <ol className="list-decimal pl-6">
          <li className="py-2">
            <h3 className="text-xl font-semibold">
              Step 1: Clone the GitHub Repository
            </h3>
            <p className="py-2">
              To get started with this project, follow these steps:
            </p>
            <ol className="list-decimal pl-6">
              <li className="py-1">
                <p className="py-1">Open your terminal.</p>
              </li>
              <li className="py-1">
                <p className="py-1">
                  Navigate to the directory where you want to clone the project.
                </p>
              </li>
              <li className="py-1">
                <p className="py-1">
                  Run the following command to clone the repository:
                </p>
                <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
                  git clone https://github.com/Trox824/BlockchainVisualize
                </pre>
              </li>
            </ol>
          </li>

          <li className="py-2">
            <h3 className="text-xl font-semibold">
              Step 2: Install and Run Neo4j Database
            </h3>
            <p className="py-2">
              Import the provided dataset into your Neo4j database using the
              following query:
            </p>
            <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
              {`LOAD CSV WITH HEADERS FROM 'file:///nodes.csv' AS row
MERGE (a:Address {addressId: row.addressId, type: row.type});

LOAD CSV WITH HEADERS FROM 'file:///relationships.csv' AS row
CREATE (:Transaction {
  hash: row.hash,
  from_address: row.from_address,
  to_address: row.to_address,
  value: toFloat(row.value),
  input: row.input,
  transaction_index: toInteger(row.transaction_index),
  gas: toInteger(row.gas),
  gas_used: toInteger(row.gas_used),
  gas_price: toFloat(row.gas_price),
  transaction_fee: toFloat(row.transaction_fee),
  block_number: toInteger(row.block_number),
  block_hash: row.block_hash,
  block_timestamp: toInteger(row.block_timestamp)
});

MATCH (t:Transaction), (a:Address)
WHERE t.to_address = a.addressId

// Create a relationship between them
CREATE (t)-[:TRANSFER]->(a);

MATCH (t:Transaction), (a:Address)
WHERE t.from_address = a.addressId

// Create a relationship between them
CREATE (a)-[:TRANSFER]->(t);`}
            </pre>
            <p className="py-2">
              Don't forget to change the database address in the `database.py`
              file.
            </p>
          </li>

          <li className="py-2">
            <h3 className="text-xl font-semibold">Step 3: Run the Frontend</h3>
            <p className="py-2">To run the frontend, follow these steps:</p>
            <ol className="list-decimal pl-6">
              <li className="py-1">
                <p className="py-1">Install the required node modules:</p>
                <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
                  npm install
                </pre>
              </li>
              <li className="py-1">
                <p className="py-1">Run the website on localhost:</p>
                <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
                  npm run dev
                </pre>
              </li>
            </ol>
          </li>
          <li className="py-2">
            <h3 className="text-xl font-semibold">Step 4: Run the Backtend</h3>
            <p className="py-2">To run the Backend, follow these steps:</p>
            <ol className="list-decimal pl-6">
              <li className="py-1">
                <p className="py-1">Change directory to the API folder:</p>
                <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
                  cd path/to/api/folder
                </pre>
              </li>
              <li className="py-1">
                <p className="py-1">Run the API with Python:</p>
                <pre className="bg-base-200 rounded-xl shadow-xl p-2 p-2">
                  python3 main.py
                </pre>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Documentation;
