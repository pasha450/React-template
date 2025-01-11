import { toast } from "react-toastify";
const successHandler = (response) => {
    if (response && response.status === true) {
        toast.success(response.message, {
            // position: toast.POSITION.TOP_RIGHT,
        
        });
    }else{

    }
}
export default successHandler;
