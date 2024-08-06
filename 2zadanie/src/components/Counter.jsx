import React from "react";

export const Counter = ({ data }) => {
  const getListClassName = (counterKey) => {
    const className = "list-counter__link";
    if (counterKey) {
      return `${className} ${className}__icon ${className}__icon--${counterKey}`;
    }
    return data;
  };

  if (!data) {
    return <></>;
  }

  return (
    <section className="advantages">
      <ul className="advantages__list list-counter">
        {Object.keys(data).map((counterKey) => (
          <a
            className={getListClassName(counterKey)}
            key={counterKey}
            href="#!"
          >
            <li className="list-counter__item">
              <p className="list-counter__item-number">
                {data[counterKey].count}
              </p>
              <span className="list-counter__item-description">
                {data[counterKey].name}
              </span>
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default Counter;
