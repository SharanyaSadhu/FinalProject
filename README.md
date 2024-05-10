# Azure Form Recognizer API Documentation
This API connects to Azure Form Recognizer and allows you to extract text from a pdf file using machine learning models 
# Getting Started 
To get started, you need an Azure account and an Azure Form Recognizer resource. Sign up for Azure if you haven't already and create a Form Recognizer resource in the Azure portal. 
Once it is done and the resource is created you'll get and API key to authenticate the requests.

# Authentication
Authentication to the Form Recognizer API is done via an API key. Setup this key to use in the environment variables so that it won't be publicly exposed. <br />
Below is how it can be done in a Ubuntu environment <br />
export FORM_RECOGNIZER_API_KEY=your_api_key_here <br/ >
For windows environment setup the key in system variables.

# Endpoints

Endpoint: '/analyze' <br />
Method: 'POST' <br />
Description: Analyzes the document from the provided URL and outputs the text contained in it. <br />
Request body: "formUrl": This is the URL of the document to be analyzed. <br />
Response: The URL where the preview content is hosted in Azure

Endpoint: '/analyzeResults/{resultId}' <br />
Method: 'GET' <br />
Input: The response content from previous POST request <br />
For Example if the response is {"content: "URL"}, please input this URL <br />
Description: This gives the result of analysis and the body contains the text present in the provided pdf or png or jpg file

# Error Handling

This API returns appropriate HTTP status codes along with error messages in case of failures. Common error codes include <br />
400 Bad Request: When the request is malformed or missing required parameters <br />
401 Unauthorized: When the API key is missing or invalid. <br />
500 Internal Server Error: When an unexpected error occurs on the server <br />

# Data Encoding 

Requests and Responses are encoded in JSON format. 

# How to Run 

To run this API first replace the "endpoint" parameter in the js file to your Azure portal endpoint. <br />
Then add the authentication key to your system or environment variable. Because in the code it is being fetched from process.env.FORM_RECOGNIZER_API_KEY.

Then run # node finalproject.js and it will start the server at port 5000 <br />
Access it at https:URL:5000/api-docs <br />
To execute the API enter the document url in the body and hit execute. It will return the text contained in the uploaded document. <br />

# Note 
Please note that the document types accepted are .pdf, .jpg and .png files 

# Bonus 
To keep the server running even after exiting/closing the terminal, start it using pm2 instance <br />
Steps to install pm2 <br />
#npm install pm2 <br/>
Then run it using below command <br />
pm2 start finalproject.js <br />
This ensures that the server is running and the process won't be killed after exiting the terminal 
