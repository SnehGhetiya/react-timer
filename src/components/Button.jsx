import { string, func } from "prop-types";

const Button = ({ name, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: string,
  onClick: func,
};

export default Button;
