import { useState } from "react";
import { Transition } from "@headlessui/react";

const Search = () => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setIsShowing((isShowing) => !isShowing)}
      >
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto rounded-3xl "
        />
      </Transition>
    </>
  );
};

export default Search;
