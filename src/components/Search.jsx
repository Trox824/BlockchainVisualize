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

const Search = () => {
  const [search, setSearch] = useState("");

  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div
      onFocus={() => setSearchFocus(true)}
      onBlur={() => setSearchFocus(false)}
    >
      <div className="grid grid-cols-12 justify-between gap-2 gap-x-4 gap-y-2">
        <Select label="Filter" className="col-span-12 sm:col-span-4" size="md">
          <SelectItem key={1} value={1}>
            Address
          </SelectItem>
          <SelectItem key={2} value={1}>
            Transaction
          </SelectItem>
          <SelectItem key={3} value={1}>
            NFT
          </SelectItem>
        </Select>
        <Input
          size="md"
          className="col-span-12 sm:col-span-8"
          radius="md"
          label={`Search by address/txn`}
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
              {Array(search.length)
                .fill()
                .map((index) => {
                  return (
                    <ListboxItem
                      key={index}
                      onClick={() => {
                        onOpen();
                      }}
                    >
                      <Link to="/address/0xafe7e3264efca320af481af3408d6f348878ec88">
                        0xafe7e3264efca320af481af3408d6f348878ec88
                      </Link>
                    </ListboxItem>
                  );
                })}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Search;
