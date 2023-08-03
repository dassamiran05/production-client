import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countDownDate = new Date("Oct 5, 2023 15:37:25").getTime();
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      // }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="time-counter">
      <div className="time-countdown clearfix" data-countdown="2020/2/01">
        <div className="counter-column">
          <div className="inner">
            <span className="count">{days}</span>Days
          </div>
        </div>{" "}
        <div className="counter-column">
          <div className="inner">
            <span className="count">{hours}</span>Hours
          </div>
        </div>{" "}
        <div className="counter-column">
          <div className="inner">
            <span className="count">{minutes}</span>Mins
          </div>
        </div>{" "}
        <div className="counter-column">
          <div className="inner">
            <span className="count">{seconds}</span>Secs
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
