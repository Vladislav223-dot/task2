import React, { useMemo, useState } from "react";

const getClass = (type, data) => {
  const elementClassName = "list-company__item";
  const linkElementClassName = `${elementClassName}-link`;

  let colorModifier;

  if (type === "item") {
    colorModifier = `--${data.state}`;
    return `${elementClassName} ${elementClassName}${colorModifier}`;
  }

  const isOrange = data.update > 4;
  const isPurple = !isOrange && data.update >= 1;

  if (isOrange) {
    colorModifier = '--orange';
  } else if (isPurple) {
    colorModifier = '--purple';
  } else {
    colorModifier = '--gray';
  }

  return `${linkElementClassName} ${linkElementClassName}${colorModifier}`;
};

const Company = ({ data }) => {
  const isSync =
    data.syncShops === data.totalShops && data.totalShops === 0 ? true : false;

  const getParameters = useMemo(() => {
    if (isSync === false && data.state === "purple") {
      return (
        <>
          <li className="list-parameter__item list-parameter__item--complited">
            Синхронизировано
          </li>
          <li className="list-parameter__item">Инфа</li>
          <li className="list-parameter__item">Прайс</li>
          <li className="list-parameter__item">Фото</li>
          <li className="list-parameter__item">Акции</li>
        </>
      );
    } else if (isSync === false) {
      return (
        <li className="list-parameter__item list-parameter__item--complited">
          Синхронизировано
        </li>
      );
    } else {
      if (isSync === true) {
        return (
          <li className="list-parameter__item list-parameter__item--loading">
            Выполняется синхронизация
          </li>
        );
      }
    }
  }, [data.state]);

  const getRatingClass = useMemo(() => {
    const ratingClass = "list-company__item-stars";
    if (data.rating >= 3) {
      return `${ratingClass} ${ratingClass}--high`;
    } else {
      return `${ratingClass} ${ratingClass}--low`;
    }
  }, [data.rating]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={getClass("item", data)}>
      <div className="list-company__item-header">
        <p className="list-company__item-description">
          <strong>{data.name} </strong>
          {isSync === false && !data.isTurnedOff && (
            <span className="list-company__item-refining">
              &bull; все {data.syncShops} заведений настроены
            </span>
          )}
          {isSync === true && !data.isTurnedOff && (
            <span className="list-company__item-refining">
              Настроено {data.syncShops} из {data.totalShops + "..."}
            </span>
          )}
        </p>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="list-company__toggle" type="button">
            {isHovered && (
              <span className="list-company__tooltip">Включить</span>
            )}
          </button>
        </div>
      </div>
      {!data.isTurnedOff && (
        <ul className="list-company__item-list list-parameter">
          {getParameters}
        </ul>
      )}
      {!data.isTurnedOff ? (
        isSync === false && (
          <p className="list-company__item-rating">
            <div>
              <span className={getRatingClass}>{data.rating} из 5</span>
              &bull; {data.review} отзывов, {data.reply} неотвеченных
            </div>
            {data.update === 0 && (
              <a className={getClass("link", data)} href="#!">
                {"Обновлений нет"}
              </a>
            )}
            {data.update > 0 && data.update <= 4 && (
              <a className={getClass("link", data)} href="#!">
                {data.update + " обновления"}
              </a>
            )}
            {data.update > 4 && (
              <a className={getClass("link", data)} href="#!">
                {"Требует действий"}
              </a>
            )}
          </p>
        )
      ) : (
        <span className="list-company__item-refining">Площадка отключена</span>
      )}
    </div>
  );
};

export default Company;
