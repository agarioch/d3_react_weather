import React, {useState, useEffect} from 'react';
import './App.css';
import Chart from './visualizations/Chart';

function App() {
  const [city, setCity] = useState('sf')
  const [temps, setTemps] = useState({})
  const data = temps[city]

  
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL || ""}/sf.json`),
      fetch(`${process.env.PUBLIC_URL || ""}/ny.json`)
    ])
    .then(responses => Promise.all(responses.map(resp => resp.json())))
    .then(([sf, ny]) => {
      sf.forEach(day => (day.date = new Date(day.date)));
      ny.forEach(day => (day.date = new Date(day.date)));

      setTemps({sf, ny});

    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Temperatures for {' '} 
        <select name="city" onChange={e => setCity(e.target.value)}>
          {[
              {label: "San Francisco", value: "sf"},
              {label: "New York", value: "ny"}
            ].map(option => {
            return(
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
        </h1>
          <Chart data={data} />
          <pre>
          <code>

            {JSON.stringify(data, null, 4)}
          </code>
          </pre>

      </header>
    </div>
  );
}

export default App;
