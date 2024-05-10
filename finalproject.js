const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


const endpoint = "https://finalprojectsharanyasadhu.cognitiveservices.azure.com/documentintelligence/documentModels/prebuilt-read:analyze?api-version=2024-02-29-preview";
const key = process.env.FORM_RECOGNIZER_API_KEY;


const getAnalysisResults = async (resultId) => {
    try {
        const response = await axios.get(resultId, {
            headers: {
                'Ocp-Apim-Subscription-Key': key,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error retrieving analysis results:', error);
        throw error;
    }
};


const analyzeDocumentFromUrl = async (urlSource) => {
    try {
        const response = await axios.post(`${endpoint}`, { urlSource }, {
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Content-Type': 'application/json'
            }
        });
        return response.headers['operation-location'];

    } catch (error) {
        console.error('Error analyzing document:', error);
        throw error;
    }
};


app.post('/analyze', async (req, res) => {
    const  { formUrl }  = req.body;
    if (!formUrl) {
        return res.status(400).json({ error: 'formUrl is required' });
    }

    try {
        const content = await analyzeDocumentFromUrl(formUrl);
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/analyzeResults/:resultId', async (req, res) => {
    const { resultId } = req.params;

    try {
        const analysisResult = await getAnalysisResults(resultId);
        res.json({ analysisResult });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
