# database.py
from neo4j import GraphDatabase

uri = "neo4j+s://35af7441.databases.neo4j.io"
user = "neo4j"
password = "18092004"

class Database:
    def __init__(self):
        self.driver = None

    def connect(self):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        if self.driver:
            self.driver.close()

db = Database()
