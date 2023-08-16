import { string } from "prop-types";

const Timer = ({ value }) => {
  return <span className="time-container">{value}</span>;
};

Timer.propTypes = {
  value: string,
};

export default Timer;
