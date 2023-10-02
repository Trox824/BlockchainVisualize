# transaction.py
from fastapi import APIRouter, Query
from datetime import datetime
from database import db

router = APIRouter()

@router.get("/transaction/{hash}")
async def Address(hash):
    db.connect()
    session = db.driver.session()
    
    q1 = """
     MATCH (t:Transaction {hash: $hash})
        RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address, 
        t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
        t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price, 
        t.transaction_fee AS transaction_fee, t.block_number AS block_number,
        t.block_hash AS block_hash, t.block_timestamp AS block_timestamp;
    """
    parameters = {"hash": hash}
    results = session.run(q1, parameters=parameters)
    # Collect the results in a list of dictionaries
    address = [dict(row) for row in results]
    
    db.close()  # Close the driver when done
    
    return {"response": address}

@router.get("/uniqueTransactions/{Node_Id}")
async def uniqueTransactions(Node_Id):
    db.connect()
    session = db.driver.session()
    if (Node_Id == "All"):
        q1 = """
        MATCH (a1:Address)-[:TRANSFER]->(t:Transaction)-[:TRANSFER]->(a2:Address)
        RETURN DISTINCT t.from_address as from, t.to_address as to, t.hash as hash, count(t) as count, sum(t.value) as total
        """
        results = session.run(q1)
    else:
        q1 = """
        MATCH (t:Transaction)
        WHERE t.to_address = $Node_Id OR t.from_address = $Node_Id
        RETURN DISTINCT t.from_address as from, t.to_address as to, t.hash as hash, count(t) as count, sum(t.value) as total
        """
        parameters = {"Node_Id": Node_Id}
        results = session.run(q1, parameters=parameters)
    
    # Collect the results in a list of dictionaries
    uniqueTransactions = [{"from": row["from"], "to": row["to"],"hash": row["hash"], "count": row["count"], "total": row["total"] } for row in results]
    
    db.close()  # Close the driver when done
    
    return {"response": uniqueTransactions}

@router.get("/Transactions/{hash}")
async def Transactions(hash):
    db.connect()
    session = db.driver.session()
    if(hash == "All"):
        q1 = """
        MATCH (t:Transaction)
        RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address, 
        t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
        t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price, 
        t.transaction_fee AS transaction_fee, t.block_number AS block_number,
        t.block_hash AS block_hash, t.block_timestamp AS block_timestamp;
        """
        results = session.run(q1)
    else:
        q1 = """
        MATCH (t1:Transaction { hash: $hash })
        WITH t1
        MATCH (t:Transaction)
        WHERE t1.from_address = t.from_address AND t1.to_address = t.to_address
        RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address, 
            t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
            t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price, 
            t.transaction_fee AS transaction_fee, t.block_number AS block_number,
            t.block_hash AS block_hash, t.block_timestamp AS block_timestamp
        ORDER BY t.block_timestamp DESC;

        
        """
        parameters = {"hash": hash}
        results = session.run(q1, parameters=parameters)
    
    # Collect the results in a list of dictionaries
    Transactions = [dict(row) for row in results]
    
    db.close()
    
    return {"response": Transactions}

@router.get("/EdgeTable/{hash}")
async def EdgeTable(hash):
    db.connect()
    session = db.driver.session()
    
    q1 = """
    MATCH (t1:Transaction { hash: $hash })
    WITH t1
    MATCH (t2:Transaction)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN count(t2) as count
 
    """
    parameters = {"hash": hash}
    result1 = session.run(q1, parameters=parameters)
    
    q2 = """
    MATCH (t1:Transaction { hash: $hash })
    WITH t1
    MATCH (t2:Transaction)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    WITH sum(t2.value) AS totalValue
    RETURN totalValue
    """
    parameters = {"hash": hash}
    result2 = session.run(q2, parameters=parameters)
    
    q3 = """
    MATCH (t1:Transaction { hash: $hash })
    WITH t1
    MATCH (t2:Transaction)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN t2.block_timestamp as newest
    ORDER BY t2.timestamp DESC
    LIMIT 1
    """
    parameters = {"hash": hash}
    result3 = session.run(q3, parameters=parameters)
    
    q4 = """
    MATCH (t1:Transaction { hash: $hash })
    WITH t1
    MATCH (t2:Transaction)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN t2.block_timestamp as latest
    ORDER BY t2.timestamp ASC
    LIMIT 1
    """
    parameters = {"hash": hash}
    result4 = session.run(q4, parameters=parameters)
    
    # Collect the results in a list of dictionaries
    result1 = result1.single()
    result2 = result2.single()
    result3 = result3.single()
    result4 = result4.single()
    
    EdgeTable = {
        "totalValue": result2["totalValue"],
        "transactions": result1["count"],
        "newest": datetime.fromtimestamp(result3["newest"]).strftime('%Y-%m-%d %H:%M:%S'),
        "latest": datetime.fromtimestamp(result4["latest"]).strftime('%Y-%m-%d %H:%M:%S'),
    }
    
    db.close()
    
    return {"response": EdgeTable}
