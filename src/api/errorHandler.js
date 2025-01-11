import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import {codeMessage} from "../utils/codeMessage"


export const validationErrors = (response) => { 
    if (!response || !response.status ) {
        console.error("Invalid response object 1111:", response);
        return; 
    }
    const{ status , data } = response

    if(status===400){
        toast.error(data?.errors?.[0]?.msg || "Bad Request: Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }else if(status === 403){
        toast.error(data?.message || "Forbidden: Access denied!");
    }else if(status === 409){
        Swal.fire({
            icon: "error",
            title: "Ooh Noo",
            text: data?.errors?.[0]?.msg || "Something went wrong !",
            confirmButtonText: "OK",
        });
    }else if(status === 500){
        toast.error("Internal Server Error. Please try again later.");
        console.error("Server Error:", data?.message || "An unexpected error occurred.");
    }else{
        console.error("Unhandled status code:", status);
        toast.error("Something went wrong. Please try again.");
    }
};


