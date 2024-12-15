// const swaggerDocument = {
//     openapi: "3.1.0",
//     info: {
//         title: "Cyber Media",
//         description: "API Docs",
//         version: "3.1.0",
//         license: {
//             name: "Apache 2.0",
//             url: "https://www.apache.org/licenses/LICENSE-2.0.html",
//         },
//         version: "1.0.1",
//     },
//     server: [
//         {
//             url: "http://localhost:3069/api-docs",
//             description: "Development server",
//         }, //Dev
//         {
//             url: "https://cyber-media/api",
//             description: "Production server",
//         },
//     ],

import video from "./video.swagger.js";

//     "/video/video-list/{id}": {
//         get: {
//             description:
//                 "Returns all pets from the system that the user has access to",
//             responses: {
//                 200: {
//                     description: "A list of pets.",
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 type: "array",
//                                 items: {
//                                     $ref: "#/components/schemas/pet",
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     },
// };

// export default swaggerDocument;

const swaggerDocument = {
    openapi: `3.1.0`,
    info: {
        title: `Document API Cyber Media`,
        version: `1.0.0`,
    },
    servers: [
        {
            url: `http://localhost:3069`,
            description: `Server dưới local`,
        },
        {
            url: `https://google.com`,
            description: `Server đã được deploy lên prod`,
        },
    ],
    components: {
        securitySchemes: {
            longToken: {
                type: `http`,
                scheme: `bearer`,
                bearerFormat: `JWT`,
            },
        },
    },
    paths: {
        ...video,
    },
};

export default swaggerDocument;
