import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Filter } from "./Filtro";
import { parseDatepicker } from "../http/usefulFunctions";
import { useHistory } from "react-router-dom";

export function NavFilter({ optionCities, optionThematics, onFilter }) {
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();
  const [state, setState] = useState({
    city_id: null,
    thematic_id: null,
    event_date: null
  });
  /**
   * Histoy o window.location.reload???git add
   */
  const handleClick = () => {
    if (
      state.city_id === null &&
      state.thematic_id === null &&
      state.event_date === null
    ) {
      history.push("/principal");
    }
    onFilter(state);
  };

  const handleDateChange = day => {
    setStartDate(day);
    setState({
      ...state,
      event_date: parseDatepicker(day)
    });
  };

  return (
    <nav className="nav-filter">
      <ul>
        <li key="cityFilter">
          <Filter
            handleChange={e => {
              setState({
                ...state,
                city_id: e.target.value === "nada" ? null : e.target.value
              });
            }}
            label={"Ciudades"}
            data={optionCities}
          />
        </li>
        <li key="thematicFilter">
          <Filter
            handleChange={e =>
              setState({
                ...state,
                thematic_id: e.target.value === "nada" ? null : e.target.value
              })
            }
            label={"Temáticas"}
            data={optionThematics}
          />
        </li>
        <li key="dateFilter">
          <label id="fecha">Fecha</label>
          <DatePicker
            id="datepicker"
            placeholderText="Click to select a date"
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={handleDateChange}
          />
        </li>
      </ul>
      <button onClick={handleClick} className="btn" id="login-page">
        Filtrar
      </button>
    </nav>
  );
}
