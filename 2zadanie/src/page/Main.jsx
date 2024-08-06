import React, { useState, useEffect } from "react";
import { Counter, CompanyList } from "../components";
import {
  getRandomObject,
  sortItems,
  getRandomCompany,
  getRandomNumber,
} from "../tools/main";

const UPDATE_INTERVAL = 3000;

export const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const jsonData = [
    { id: 1, name: "Google" },
    { id: 2, name: "Yandex" },
    { id: 3, name: "Rambler" },
    { id: 4, name: "2Gis" },
    { id: 5, name: "Waze" },
  ];

  const states = ["purple", "orange", "gray"];
  const [data, setData] = useState(getRandomObject(jsonData, states));

  useEffect(() => {
    setSortData(sortItems(data));
  }, [data]);

  const defaultCounters = {
    reviews: { count: 0, name: "отзывов" },
    replies: { count: 0, name: "неотвеченных отзывов" },
    updates: { count: 0, name: "обновлений" },
    rating: { count: 0, name: "средний рейтинг" },
  };

  const [counters, setCounters] = useState(defaultCounters);
  const [sortData, setSortData] = useState({});

  useEffect(() => {
    setCounters(() => {
      const updatedCounters = JSON.parse(JSON.stringify(defaultCounters));
      let totalCompanies = data.length;

      data.forEach((company) => {
        updatedCounters.reviews.count += company.review;
        updatedCounters.replies.count += company.reply;
        updatedCounters.updates.count += company.update;
        updatedCounters.rating.count += company.rating;
      });

      if (totalCompanies > 0) {
        updatedCounters.rating.count =
          updatedCounters.rating.count / totalCompanies;
      }

      return updatedCounters;
    });
  }, [data]);

  const updateData = () => {
    setData((prevData) => {
      const randomIndex = getRandomNumber(0, prevData.length - 1);
      const randomCompany = prevData[randomIndex];
      const updatedCompany = getRandomCompany(randomCompany, states);
      const newData = prevData.map((company) =>
        company.id === randomCompany.id ? updatedCompany : company
      );
      return newData;
    });
  };

  if (!sortData || sortData.length === 0) {
    return <>Загрузка...</>;
  }

  return (
    <div className="page__body">
      <main className="main-container">
        <h1 className="visually-hidden">Преимущества и программы компании</h1>
        <Counter data={counters}></Counter>
        <CompanyList data={sortData}></CompanyList>
      </main>
    </div>
  );
};

export default App;
