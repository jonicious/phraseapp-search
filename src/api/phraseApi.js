const axios = require('axios');
const accessToken = process.env.PHRASE_APP_ACCESS_TOKEN;

const getProjects = async () => {
    const response = await axios.get('https://api.phraseapp.com/api/v2/projects', {
        params: {
            'per_page': 100
        },
        headers: {
            'Authorization': `token ${accessToken}`
        }
    });
    return response.data;
};

const getAccounts = async () => {
    const response = await axios.get('https://api.phraseapp.com/api/v2/accounts', {
        params: {
            'per_page': 100
        },
        headers: {
            'Authorization': `token ${accessToken}`
        }
    });
    return response.data;
};

const searchThroughProject = async (searchString, projectId) => {
    const response = await axios.post(
        `https://api.phraseapp.com/api/v2/projects/${projectId}/translations/search`,
        {
            q: searchString
        },
        {
            params: {
                'per_page': 100
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${accessToken}`
            }
        }
    );

    return response.data;
};

const getResultListForString = async searchString => {
    const projects = await getProjects();

    const resultList = [];

    for (let project of projects) {
        const results = await searchThroughProject(searchString, project.id);
        results.forEach(result => {
            console.log(result);
            resultList.push({
                keyName: result.key.name,
                keyId: result.key.id,
                locale: result.locale.code,
                localeId: result.locale.id,
                projectId: project.id,
                projectName: project.name,
                text: result.content
            })
        });
    }

    console.log(`Result for string ${searchString}`, resultList);
    return resultList;
};


module.exports = {
    getResultListForString,
    getAccounts
};

