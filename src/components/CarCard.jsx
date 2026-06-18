import { Link } from 'react-router-dom';
import { formatPrice, formatMileage } from '../data/cars';

export default function CarCard({ car, className = '', style = {} }) {
  return (
    <Link to={`/inventory/${car.id}`} className={`car-card ${className}`} style={style}>
      <div className="car-card__img-wrap">
        <img
          src={car.images[0]}
          alt={car.name}
          loading="lazy"
        />
      </div>
      <div className="car-card__body">
        <h3 className="car-card__name">{car.name}</h3>
        <p className="car-card__meta">
          {car.year} &nbsp;·&nbsp; {formatMileage(car.mileage)} &nbsp;·&nbsp; {car.specs.colour}
        </p>
        <div className="car-card__footer">
          <span className="car-card__price">{formatPrice(car.price)}</span>
          <span className={`pill pill--${car.status}`}>
            {car.status === 'available' ? 'Available' : car.status === 'reserved' ? 'Reserved' : 'Sold'}
          </span>
        </div>
      </div>
    </Link>
  );
}
