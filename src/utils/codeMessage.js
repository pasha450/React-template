export  const codeMessage ={
    200:'The server returned the successfully requested data',
    201:'Create or modify data successfully' ,
    202:'a request has been accepted for processing, but processing has not been completed or may not have started',
    204 :'Delete data sucessfully',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: 'Session Expired! Please login again. ',
    403: 'The admin is authorized, but access is forbidden. ',//doesn't have the right permission for access the resource
    422: 'When creating an object, a validation error occurred. ',
    500: 'An error occured in the server,please check the server.', 
}   
