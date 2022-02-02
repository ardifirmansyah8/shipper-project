import { NextPage } from "next";
import {
  UserCircleIcon,
  SearchIcon,
  PlusIcon,
  DotsHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import format from "date-fns/format";
import { useState } from "react";

import Layout from "../components/Layout";
import Loader from "../components/Loader";
import NoData from "../components/NoData";
import { useUser } from "../hooks/useUsers";

const DriverManagementPage: NextPage = () => {
  const { isLoading, page, users, changePage, searchDriver } = useUser();

  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    if (e.key === "Enter") {
      searchDriver(search);
    }
  };

  const emptySearch = () => {
      setSearch("");
      searchDriver("")
  }

  return (
    <Layout>
      <>
        <div className="mb-8 flex w-full justify-between border border-gray-300 bg-white px-8 py-4 drop-shadow-md">
          <div>
            <div className="text-3xl font-bold text-red-500">
              DRIVER MANAGEMENT
            </div>
            <div className="text-sm text-gray-500">
              Data driver yang bekerja sama dengan Anda
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative mr-4 border border-gray-300 pl-10 pr-10">
              <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-red-500" />
              <input
                placeholder="Cari driver"
                className="h-10 w-32 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={onSearch}
              />
              {search && (
                <XIcon
                  className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-500"
                  onClick={() => emptySearch()}
                />
              )}
            </div>
            <button className="flex h-10 w-auto items-center border-b-2 border-red-700 bg-red-500 p-2 text-xs font-bold text-white hover:bg-red-300">
              <span>TAMBAH DRIVER</span>
              <PlusIcon className="ml-2 h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        {!isLoading && users.length === 0 && <NoData />}

        {!isLoading && (
          <>
            <div className="scrolling-wrapper flex flex-nowrap gap-16 overflow-x-auto py-4">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="w-64 rounded border border-gray-300 bg-white drop-shadow-md"
                >
                  <div className="flex w-full justify-between border-b-4 border-gray-200 p-3">
                    <div className="w-40 truncate text-gray-400">
                      Driver ID:{" "}
                      <span className="text-red-500">
                        {user.id.value || "-"}
                      </span>
                    </div>
                    <DotsHorizontalIcon className="h-7 w-7 cursor-pointer text-gray-300" />
                  </div>
                  <div className="w-full p-3">
                    {user.picture.medium ? (
                      <img
                        src={user.picture.medium}
                        width={72}
                        height={72}
                        className="mb-6 rounded"
                      />
                    ) : (
                      <UserCircleIcon className="mb-6 h-24 w-24 text-gray-300" />
                    )}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Nama Driver</div>
                      <div>
                        {user.name.first} {user.name.last}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Telepon</div>
                      <div>{user.phone}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="w-64 truncate">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tanggal Lahir</div>
                      <div>{format(new Date(user.dob.date), "dd-mm-yyyy")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <div className="flex w-96 justify-between">
                <div
                  className={`flex items-center text-lg ${
                    page === 1
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer"
                  }`}
                  onClick={() => changePage(page - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                  <div>Previous Page </div>
                </div>

                <div
                  className={`flex items-center text-lg ${
                    page === 5 || users.length !== 5
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer"
                  }`}
                  onClick={() => changePage(page + 1)}
                >
                  <div>Next Page</div>
                  <ChevronRightIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

export default DriverManagementPage;
