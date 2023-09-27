# Backend Script Example

from fastapi import FastAPI
from neo4j import GraphDatabase
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

uri = os.getenv("uri")
user = os.getenv("user")
password = os.getenv("password")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def connection():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    return driver

def close(driver):
     driver.close()

@app.get("/")
async def root():
    return {"Response" : "This is the root path"}

@app.get("/AllAddress")
async def allAddress():
    driver_neo4j = connection()
    session = driver_neo4j.session()
    q1 = """
    MATCH (a:Address) RETURN properties(a) AS addressProperties
    """
    results = session.run(q1)
    addresses = [record["addressProperties"] for record in results]
    session.close()
    close(driver_neo4j)  # Close the driver when done
    return {"addresses": addresses}


