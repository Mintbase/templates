// const fetch = require('node-fetch'); // Use node-fetch to make HTTP requests
const { Readable } = require('stream');
const mime = require('mime-types');
const axios = require('axios');

const uploadIPFS = async (fileUrl) => {
    try {
        // const file = await urlToFile(fileUrl, 'image.jpg');

        const formData = new FormData();
        // formData.append('file', file);

        const res = await axios.post('https://ipfs.near.social/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
            },
        });

        if (res.status === 200) {
            const data = res.data;
            console.log('File Upload Result:', data);
            return data.cid;
        } else {
            throw new Error('Upload failed with status ' + res.status);
        }
    } catch (error) {
        console.error('Error >>', error.message);
        throw error;
    }
};

// const urlToFile = async (fileUrl, fileName) => {
//     try {
//         const fetch = (await import('node-fetch')).default;
//         // Fetch the file from the URL
//         const response = await fetch(fileUrl);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch file. Status: ${response.status}`);
//         }

//         // Get the content-type from the response headers
//         const contentType = response.headers.get('content-type') || 'application/octet-stream';

//         // Get the file extension from the MIME type
//         const extension = mime.extension(contentType) || 'bin';

//         // Read the response body as a buffer
//         const buffer = await response.buffer();

//         // Create a file-like object
//         const file = {
//             buffer,
//             fileName: `${fileName}.jpg`,
//             contentType,
//             size: buffer.length,
//             // Mimicking a File object
//             stream: Readable.from(buffer),
//         };

//         console.log('File-like object created:', file);
//         return file;
//     } catch (error) {
//         console.error('Error converting URL to file:', error.message);
//         throw error;
//     }
// };

// const urlToFile = async (fileUrl, fileName) => {
//     try {
//         const fetch = (await import('node-fetch')).default;
//         const response = await fetch(fileUrl);

//         // Check if the request was successful
//         if (!response.ok) {
//             throw new Error(`Failed to fetch image: ${response.statusText}`);
//         }

//         // Convert the response to a Blob
//         const blob = await response.blob();

//         // Create a File object from the Blob
//         const file = new File([blob], fileName, { type: blob.type });

//         console.log("File >> ", file)

//         return file;
//     } catch (error) {
//         console.error('Error converting URL to file:', error.message);
//         throw error;
//     }
// };

module.exports = { uploadIPFS };
