import { useState, useEffect } from "react";

type User = {
  name: { first: string; last: string };
  email: string;
  dob: { date: string };
  phone: string;
  picture: {
    medium: string;
  };
  id: {
    value: string;
  };
};

const limit = 5;

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sourceData, setSourceData] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  const getUser = () => {
    setIsLoading(true);

    fetch("https://randomuser.me/api/?results=30")
      .then((response) => response.json())
      .then(({ results }) => {
        localStorage.setItem("driver", JSON.stringify(results));
        setData(results);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  const setData = (results: User[]) => {
    setSourceData(results);
    setUsers(results.slice(0, limit));
  };

  const changePage = (pageNum: number) => {
    setPage(pageNum);
    setUsers(sourceData.slice((pageNum - 1) * limit, limit * pageNum));
  };

  const searchDriver = (value) => {
    if (value === "") {
      setUsers(sourceData);
      setPage(1);
    } else {
      const drivers = sourceData.filter(
        (driver) => driver.name.first.toLowerCase() === value.toLowerCase()
      );
      setUsers(drivers);
      setPage(1);
    }
  };

  useEffect(() => {
    const driver = JSON.parse(localStorage.getItem("driver"));
    if (driver) {
      setData(driver);
    } else {
      getUser();
    }
  }, []);

  return {
    isLoading,
    page,
    users,
    changePage,
    searchDriver,
  };
};
