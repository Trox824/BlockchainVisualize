# address.py
from fastapi import APIRouter, Query
from datetime import datetime
from database import db

router = APIRouter()

@router.get("/address/{Node_Id}")
async def Address(Node_Id):
    db.connect()
    session = db.driver.session()
    q1 = """
    MATCH (a:Address {addressId: $Node_Id})
    RETURN a.addressId AS addressId, a.type AS type
    """
    parameters = {"Node_Id": Node_Id}
    results = session.run(q1, parameters=parameters)
    # Collect the results in a list of dictionaries
    address = [{"addressId": row["addressId"], "type": row["type"]} for row in results]
    
    db.close()
     # Close the driver when done
    
    return {"response": address}

@router.get("/addresses/{Node_Id}")
async def allAddress(Node_Id):
    db.connect()
    session = db.driver.session()
    if (Node_Id == "All"):
        q1 = """
        MATCH (a:Address)
        RETURN a.addressId AS addressId, a.type AS type
        """
        results = session.run(q1)
    else:
        q1 = """
        MATCH (a1:Address {addressId: $Node_Id})-[:TRANSFER]->(t:Transaction)-[:TRANSFER]->(a2:Address)
        RETURN DISTINCT a2.addressId AS addressId, a2.type AS type
        UNION
        MATCH (a1:Address)-[:TRANSFER]->(t:Transaction)-[:TRANSFER]->(a2:Address {addressId: $Node_Id})
        RETURN DISTINCT a1.addressId AS addressId, a1.type AS type
        UNION
        MATCH (a1:Address {addressId: $Node_Id})
        return a1.addressId as addressId, a1.type as type
        """
        parameters = {"Node_Id": Node_Id}
        results = session.run(q1, parameters=parameters)
    
    # Collect the results in a list of dictionaries
    addresses = [{"addressId": row["addressId"], "type": row["type"]} for row in results]
    
    db.close()
     # Close the driver when done
    
    return {"response": addresses}

@router.get("/NodeTable/{Node_Id}")
async def NodeTable(Node_Id):
    db.connect()

    session = db.driver.session()
    # Query to get the timestamp of the newest transaction
    q1 = """
    MATCH (t:Transaction)
    WHERE t.from_address = $Node_Id OR t.to_address = $Node_Id
    RETURN t.block_timestamp
    ORDER BY t.block_timestamp DESC
    LIMIT 1
    """
    parameters = {"Node_Id": Node_Id}
    result1 = session.run(q1, parameters=parameters).single()
    q7 = """
    MATCH (t:Transaction)
    WHERE t.from_address = $Node_Id OR t.to_address = $Node_Id
    RETURN t.block_timestamp
    ORDER BY t.block_timestamp ASC
    LIMIT 1
    """
    parameters = {"Node_Id": Node_Id}
    result7 = session.run(q1, parameters=parameters).single()
    # Query to count transactions involving the given address
    q2 = """
    MATCH (t:Transaction)
    WHERE t.from_address = $Node_Id
    RETURN count(t) AS transactions
    """
    parameters = {"Node_Id": Node_Id}
    result2 = session.run(q2, parameters=parameters).single()

    # Query to find the highest transaction value
    q3 = """
    MATCH (t:Transaction)
    WHERE t.to_address = $Node_Id OR t.from_address = $Node_Id
    RETURN max(t.value) AS max_transaction_value
    """
    parameters = {"Node_Id": Node_Id}
    result3 = session.run(q3, parameters=parameters).single()

    # Query to calculate the current balance
    q4 = """
    MATCH (a:Address {addressId: $Node_Id})
    OPTIONAL MATCH (a)-[:TRANSFER]->(outgoing:Transaction {from_address: $Node_Id})
    OPTIONAL MATCH (incoming:Transaction {to_address: $Node_Id})-[:TRANSFER]->(a)
    WITH COALESCE(SUM(incoming.value), 0) - COALESCE(SUM(outgoing.value), 0) AS currentBalance
    RETURN currentBalance
    """
    parameters = {"Node_Id": Node_Id}
    result4 = session.run(q4, parameters=parameters).single()

    # Query to calculate the Total Received
    q5 = """
    MATCH (t:Transaction {to_address: $Node_Id})
    RETURN COALESCE(SUM(t.value), 0) AS total_received
    """
    parameters = {"Node_Id": Node_Id}
    result5 = session.run(q5, parameters=parameters).single()

    # Query to calculate the Total Sent
    q6 = """
    MATCH (t:Transaction {from_address: $Node_Id})
    RETURN COALESCE(SUM(t.value), 0) AS total_sent
    """
    parameters = {"Node_Id": Node_Id}
    result6 = session.run(q6, parameters=parameters).single()

    db.close()
     # Close the driver when done

    # Combine the results into a single dictionary
    NodeTable = {
        "current_balance": result4["currentBalance"],
        "timestamp": datetime.fromtimestamp(result1["t.block_timestamp"]).strftime('%Y-%m-%d %H:%M:%S'),
        "timestamp2": datetime.fromtimestamp(result7["t.block_timestamp"]).strftime('%Y-%m-%d %H:%M:%S'),
        "transactions": result2["transactions"],
        "max_transaction_value": result3["max_transaction_value"],
        "total_received": result5["total_received"],
        "total_sent": result6["total_sent"]
    }

    return {"response": NodeTable}


def fetch_address_data(node_id, page, items_per_page):
    skip_count = (page - 1) * items_per_page
    db.connect()
    session = db.driver.session()
    query = (
            f"MATCH (t:Transaction) "
            f"WHERE t.from_address = $Node_Id "
            f"RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address, "
            f"t.value AS value, t.input AS input, t.transaction_index AS transaction_index, "
            f"t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price, "
            f"t.transaction_fee AS transaction_fee, t.block_number AS block_number, "
            f"t.block_hash AS block_hash, t.block_timestamp AS block_timestamp "
            f"SKIP {skip_count} LIMIT {items_per_page}"
        )
    result = session.run(query, Node_Id=node_id)
    return [record.data() for record in result]

@router.get("/AddressTable/{Node_Id}")
async def AddressTable(
    Node_Id: str,
    page: int = Query(1, description="Page number", ge=1),
    items_per_page: int = Query(10, description="Items per page", ge=1)
):
    paginated_data = fetch_address_data(Node_Id, page, items_per_page)
    return {"response": paginated_data}