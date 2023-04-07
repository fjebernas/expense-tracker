import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function DeleteButton(props) {

  const MySwal = withReactContent(Swal);

  const handleClick = () => {
    MySwal.fire({
      title: <p>Delete budget?</p>,
      showCancelButton: true,
      confirmButtonText: 'Absolutely',
    }).then((result) => {
      if (result.isConfirmed) {
        props.handleClick(props.id);
      }
    });
  }

  return (
    <Button
      disabled={isNaN(props.id)}
      onClick={handleClick}
      variant="danger"
      className="w-100"
    >
      {props.title}
    </Button>
  );
}

export default DeleteButton;