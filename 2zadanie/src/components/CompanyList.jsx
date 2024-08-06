import React from "react";

import Company from "./Company";

const CompanyList = ({ data }) => {
  if (!Array.isArray(data)) {
    return <></>;
  }

  return (
    <section className="programm">
      <h2 className="visually-hidden">Программы предлагаемые компанией</h2>
      {data.map((item) => (
        <Company key={item.id} data={item} />
      ))}
    </section>
  );
};

export default CompanyList;
