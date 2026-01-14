const axios = require('axios');

const API_URL = 'http://localhost:5000/api/portfolio';

const testAPI = async () => {
    try {
        console.log('--- Testing Expertise ---');
        // Create
        const expRes = await axios.post(`${API_URL}/expertise`, {
            icon: 'TEST',
            heading: 'Test Heading',
            description: 'Test Description'
        });
        console.log('Create Expertise:', expRes.data._id);
        
        // Read
        await axios.get(`${API_URL}/expertise`);
        console.log('Read Expertise: OK');
        
        // Update
        await axios.put(`${API_URL}/expertise/${expRes.data._id}`, { heading: 'Updated Heading' });
        console.log('Update Expertise: OK');
        
        // Delete
        await axios.delete(`${API_URL}/expertise/${expRes.data._id}`);
        console.log('Delete Expertise: OK');
        
        console.log('\n--- Testing Projects ---');
        // Create
        const projRes = await axios.post(`${API_URL}/projects`, {
            title: 'Test Project',
            category: 'Full-Stack Development',
            type: 'FULLSTACK',
            image: '/test.png',
            description: 'Test Desc'
        });
        console.log('Create Project:', projRes.data._id);
        
        // Delete
         await axios.delete(`${API_URL}/projects/${projRes.data._id}`);
        console.log('Delete Project: OK');

         console.log('\n--- Testing Experience ---');
        // Create
        const exp2Res = await axios.post(`${API_URL}/experience`, {
            role: 'Test Role',
            company: 'Test Company',
            period: '2023',
            location: 'Test Location',
            description: 'Test Desc'
        });
        console.log('Create Experience:', exp2Res.data._id);
        
        // Delete
         await axios.delete(`${API_URL}/experience/${exp2Res.data._id}`);
        console.log('Delete Experience: OK');

        console.log('\n✅ All Tests Passed');

    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
    }
};

testAPI();
