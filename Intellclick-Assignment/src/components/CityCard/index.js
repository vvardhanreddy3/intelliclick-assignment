import React from 'react';
import './index.css'

const CityCard = (props) => {
  const { dataDetails } = props;
  const { name, cou_name_en, timezone } = dataDetails;

  return (
    <tr>
      <td>
      <a className='city-link' href={`/weather/${name}`} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </td>
      <td>{cou_name_en}</td>
      <td>{timezone}</td>
    </tr>
  );
};

export default CityCard;
