import {
  Card,
  CardBody,
  Input,
  Listbox,
  ListboxItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseNodeContext } from "../Pages/Address/GraphContext";

const Search = () => {
  const { AllNodes, UniqueTransactions, NodeID, SetNodeID } = UseNodeContext();
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [filterType, setFilterType] = useState("Address");
  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const filteredResults = AllNodes.filter((node) =>
    node.addressId.includes(search)
  );
  // filterType === "Address"
  //   ? AllNodes.filter((node) => node.label.includes(search))
  //   : UniqueTransactions.filter((txn) => txn.label.includes(search));

  return (
    <div
      onFocus={() => setSearchFocus(true)}
      onBlur={() => setSearchFocus(false)}
    >
      <div className="grid grid-cols-12 justify-between gap-2 gap-x-4 gap-y-2">
        <Select
          label="Filter"
          className="col-span-12 sm:col-span-4"
          size="md"
          value={filterType}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <SelectItem key={1} value="Address">
            Address
          </SelectItem>
          <SelectItem key={2} value="Transaction">
            Transaction
          </SelectItem>
        </Select>
        <Input
          size="md"
          className="col-span-12 sm:col-span-8"
          radius="md"
          label={`Search Address/Txn`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center relative">
        <Card
          className={`z-50 w-full absolute mt-2 transition-[height] duration-150 ease-in-out ${
            search.length > 0 && searchFocus ? "h-auto max-h-40" : "h-0"
          }`}
        >
          <CardBody className="p-1">
            <Listbox aria-label="Results">
              {filteredResults.map((result, index) => (
                <ListboxItem
                  key={index}
                  onClick={() => {
                    SetNodeID([result.addressId, result.type]);
                  }}
                >
                  <Link to={`/address/${result.addressId}`}>
                    {result.addressId}
                  </Link>
                </ListboxItem>
              ))}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Search;
