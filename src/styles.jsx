import styled from "styled-components";
import { Alert as ReactstrapAlert } from "reactstrap";

const Alert = styled(ReactstrapAlert).attrs({
  className: "position-fixed start-50 text-center",
})`
  top: ${(props) => props.top || "10px"};
  min-width: 300px;
  margin-left: -150px;
  z-index: 99999999;
  font-size: 12px;
`;

// BUTTONS

const PrimaryButton = styled.button.attrs({
  className: "default_btn",
})`
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);

  &:hover {
    background-color: #2c9a62;
    border-color: #2c9a62;
  }
`;

const SecondaryButton = styled.button.attrs({
  className: "default_btn",
})`
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);

  &:hover {
    background-color: #f4f4f5;
  }
`;

const DangerButton = styled.button.attrs({
  className: "default_btn",
})`
  background-color: #dc3545;
  border: 1px solid #dc3545;

  &:hover {
    background-color: #c83a4a;
    border-color: #c83a4a;
  }
`;

const CancelButton = styled.button.attrs({
  className: "default_btn",
})`
  background-color: #6c757d;
  border: 1px solid #6c757d;

  &:hover {
    background-color: #5c636a;
    border-color: #5c636a;
  }
`;

// BUTTONS

export { PrimaryButton, SecondaryButton, DangerButton, CancelButton, Alert };
