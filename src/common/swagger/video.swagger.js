const video = {
  "/video/video-list/": {
    get: {
      tags: [`Videos`],
      responses: {
        200: {
          description: `oke`,
        },
      },
      parameters: [
        {
          name: "page",
          in: "query",
        },
        {
          name: "pageSize",
          in: "query",
        },
      ],
    },
  },
  "/video/video-lists/": {
    get: {
      security: [
        {
          longToken: [],
        },
      ],
      tags: [`Videos`],
      responses: {
        200: {
          description: `oke`,
        },
      },
      parameters: [
        {
          name: "page",
          in: "query",
        },
        {
          name: "pageSize",
          in: "query",
        },
      ],
    },
  },

  "/video/video-create": {
    post: {
      security: [
        {
          longToken: [],
        },
      ],
      tags: [`Cars`],
      responses: {
        200: {
          description: `oke`,
        },
      },
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                age: { type: "number" },
                desc: { type: "string" },
              },
            },
          },
        },
      },
    },
  },

  "/video/video-update": {
    post: {
      security: [
        {
          longToken: [],
        },
      ],
      tags: [`Videos`],
      responses: {
        200: {
          description: `oke`,
        },
      },
      requestBody: {
        content: {
          "multipart/from-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: `string` },
                avatar: {
                  type: `file`,
                  formart: `binary`,
                },
                files: {
                  type: `array`,
                  items: {
                    type: `file`,
                    formart: `binary`,
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/video/video-delete": {
    delete: {
      security: [{ longToken: [] }],
      tags: [`role`],
      responses: { 200: { description: `oke` } },
      requestBody: {
        content: {
          "multipart/from-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: `string` },
                file: {
                  type: `file`,
                  formart: `binary`,
                },
                files: {
                  type: `array`,
                  items: {
                    type: `file`,
                    formart: `binary`,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default video;
