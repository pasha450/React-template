import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {codeMessage} from "../utils/codeMessage"

console.log("object 12345")
export const validationErrors = (response) => {
    if (response === undefined) return '';
    
    if (response !== null && response.hasOwnProperty("errors")) {
        return response.errors; 
    } else if (response && response.status === false) {
        toast.error(response.error, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } else if (response !== null) {
        if (response.status === 409) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data?.error || "Something went wrong!",
            });
        } else if (response.status === 500) {
            Swal.fire({
                icon: "error",
                title: "Internal Server Error",
                text: response.data?.error || "An unexpected error occurred on the server. Please try again later.",
            });
        } else if (response.status !== 401 && response.status !== 422) {
            toast.error(codeMessage[response.status] || "An error occurred.", {
                position: toast.POSITION.TOP_RIGHT,

            });
        }
    }
    return '';
};
export default validationErrors ;