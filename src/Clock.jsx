import { useEffect, useState } from "react";
import "./App.css";

function Clock() {
  const [time, setTime] = useState(new Date());

  const uzbekMonths = [
    'YANVAR','FEVRAL','MART','APREL','MAY','IYUN',
    'IYUL','AVGUST','SENTABR','OKTABR','NOYABR','DEKABR'
  ];

  const uzbekDays = [
    'YAKSHANBA','DUSHANBA','SESHANBA','CHORSHANBA',
    'PAYSHANBA','JUMA','SHANBA'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hours12 = hours % 12 || 12;

  const secondAngle = (seconds * 6);
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90;
  const hourAngle = (hours12 * 30) + (minutes * 0.5) - 90;

  const day = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const dayOfWeek = time.getDay();

  const hourProgress = (hours12 / 12) * 100;
  const minuteProgress = (minutes / 60) * 100;
  const secondProgress = (seconds / 60) * 100;

  return (
    <div className="container">

      <div className="clock-card">
        <h2 className="card-title" style={{ color: "#ff6b9d" }}>Analog Clock</h2>

        <div className="analog-clock">
          <div className="clock-face">
            {Array.from({length: 60}).map((_, i) => {
                const isHour = i % 5 === 0;

              return (
                <div key={i} className={`tick ${isHour ? "tick-hour" : "tick-minute"}`}
                  style={{ transform: `rotate(${i * 6}deg) translateY(-115px)`}}/>
                )
            })}

            {/* numbers */}
            <div className="number twelve">12</div>
            <div className="number three">3</div>
            <div className="number six">6</div>
            <div className="number nine">9</div>

            {/* hands */}
            <div className="hand hour-hand" style={{ transform: `rotate(${hourAngle}deg)` }} />
            <div className="hand minute-hand" style={{ transform: `rotate(${minuteAngle}deg)` }} />
            <div className="hand second-hand" style={{ transform: `rotate(${secondAngle}deg)` }} />

            <div className="center-dot"></div>
          </div>
        </div>

        {/* analog numbers */}
        <div className="analog-time-display">
          <div className="time-unit">
            <div className="time-number" style={{ color: "#ff6b9d" }}>
              {hours12.toString().padStart(2, '0')}
            </div>
            <div className="time-label">Soat</div>
          </div>

          <div className="time-unit">
            <div className="time-number" style={{ color: "#4ecdc4" }}>
              {minutes.toString().padStart(2, '0')}
            </div>
            <div className="time-label">Daqiqa</div>
          </div>

          <div className="time-unit">
            <div className="time-number" style={{ color: "#ffa726" }}>
              {seconds.toString().padStart(2, '0')}
            </div>
            <div className="time-label">Soniya</div>
          </div>
        </div>
      </div>

      {/* DIGITAL */}
      <div className="clock-card">
        <h2 className="card-title" style={{ color: "#b39ddb" }}>Digital Clock</h2>

        <div className="digital-display">
          <div className="digit-box">
            <div className="digit">{hours12.toString().padStart(2, '0')}</div>
            <div className="digit-label">Soat</div>
          </div>

          <div className="separator">:</div>

          <div className="digit-box">
            <div className="digit">{minutes.toString().padStart(2, '0')}</div>
            <div className="digit-label">Daqiqa</div>
          </div>

          <div className="separator">:</div>

          <div className="digit-box">
            <div className="digit">{seconds.toString().padStart(2, '0')}</div>
            <div className="digit-label">Soniya</div>
          </div>
        </div>

        {/* progress */}
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-label">Soat</div>
            <div className="progress-bar">
              <div className="progress-fill hour" style={{ width: `${hourProgress}%` }} />
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">Daqiqa</div>
            <div className="progress-bar">
              <div className="progress-fill minute" style={{ width: `${minuteProgress}%` }} />
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-label">Soniya</div>
            <div className="progress-bar">
              <div className="progress-fill second" style={{ width: `${secondProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* DATE */}
      <div className="date-display">
        <div className="date-item">
          <div className="date-number" style={{ color: "#ff6b9d" }}>{day}</div>
          <div className="date-label">Sana</div>
        </div>

        <div className="date-item">
          <div className="date-number" style={{ color: "#b39ddb" }}>
            {uzbekMonths[month]}
          </div>
          <div className="date-label">Oy</div>
        </div>

        <div className="date-item">
          <div className="date-number" style={{ color: "#ffa726" }}>{year}</div>
          <div className="date-label">Yil</div>
        </div>

        <button
          className="day-button"
          onClick={() => {
            alert(`${day} ${uzbekMonths[month]} ${year} - ${uzbekDays[dayOfWeek]}`);
          }}
        >
          {uzbekDays[dayOfWeek]}
        </button>
      </div>

    </div>
  );
}

export default Clock;