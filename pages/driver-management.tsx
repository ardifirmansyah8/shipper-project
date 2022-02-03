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
    searchDriver("");
  };

  return (
    <Layout>
      <>
        <div className="mb-8 flex w-full flex-col justify-between border border-gray-300 bg-white px-8 py-4 drop-shadow-md lg:flex-row">
          <div className="mb-4 lg:mb-0">
            <div className="text-xl font-bold text-red-500 lg:text-3xl">
              DRIVER MANAGEMENT
            </div>
            <div className="text-xs text-gray-500 lg:text-sm">
              Data driver yang bekerja sama dengan Anda
            </div>
          </div>
          <div className="flex flex-col items-center lg:flex-row">
            <div className="relative mb-4 w-full border border-gray-300 pl-10 pr-10 lg:mr-4 lg:mb-0 lg:w-auto">
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
            <button className="flex h-10 w-full items-center border-b-2 border-red-700 bg-red-500 p-2 text-xs font-bold text-white hover:bg-red-300 lg:w-auto">
              <span>TAMBAH DRIVER</span>
              <PlusIcon className="ml-2 h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        {!isLoading && users.length === 0 && <NoData />}

        {!isLoading && (
          <>
            <div className="scrolling-wrapper flex flex-col flex-wrap gap-16 py-4 lg:flex-row lg:flex-nowrap lg:overflow-x-auto">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="w-full rounded border border-gray-300 bg-white drop-shadow-md lg:w-72"
                >
                  <div className="lg-w-64 flex w-full justify-between border-b-4 border-gray-200 p-3">
                    <div className="lg:w-54 w-full truncate text-gray-400">
                      Driver ID:{" "}
                      <span className="text-red-500">
                        {user.id.value || "-"}
                      </span>
                    </div>
                    <DotsHorizontalIcon className="h-7 w-7 cursor-pointer text-gray-300" />
                  </div>
                  <div className="flex w-full items-center justify-center p-3 lg:block lg:w-72">
                    {user.picture.medium ? (
                      <img
                        src={user.picture.medium}
                        className="mb-6 w-32 rounded lg:w-auto"
                      />
                    ) : (
                      <UserCircleIcon className="mb-6 h-24 w-24 text-gray-300" />
                    )}
                    <div className="ml-4 lg:ml-0">
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
                      <div className="mb-4 hidden lg:block">
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="w-64 truncate">{user.email}</div>
                      </div>
                      <div className="hidden lg:block">
                        <div className="text-sm text-gray-500">
                          Tanggal Lahir
                        </div>
                        <div>
                          {format(new Date(user.dob.date), "dd-mm-yyyy")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center pb-16 lg:pb-0">
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
