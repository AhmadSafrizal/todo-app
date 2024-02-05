const swaggerJsDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");

const token = {
  name: "api_key",
  in: "query",
  required: true,
  description: "API Key dari user",
  schema: {
    type: "string",
  },
};

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kanban App",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    tags: [
      {
        name: "User",
        description: "Endpoint terkait User",
      },
      {
        name: "Category",
        description: "Endpoint terkait Category",
      },
      {
        name: "Task",
        description: "Endpoint terkait Task",
      },
    ],
    paths: {
      // Category ALl
      "/category": {
        get: {
          summary: "Mengambil semua data todo",
          description:
            "Mengambil semua data pada tabel todo yang ada dalam database",
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        name: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Category"],
        },
      },

      // Category By ID
      "/category/{id}": {
        get: {
          summary: "Mengambil data kategori By ID ",
          description:
            "Mengambil data pada tabel kategori yang ada dalam database berdasarkan id",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID kategori yang ingin diambil",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data todo",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        name: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Category"],
        },
      },

      // Post Kategori
      "/category": {
        post: {
          summary: "Menambah data kategori",
          description: "Menambah data kategori",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          name: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Category"],
        },
      },

      // Put Task
      "/category/{id}": {
        put: {
          summary: "Mengubah data kategori",
          description:
            "Mengubah data pada tabel kategori yang ada dalam database berdasarkan kategori id",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID task kategori yang ingin diubah",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengubah data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          name: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Category"],
        },
      },

      // Delete Category
      "/category/{id}": {
        delete: {
          summary: "Menghapus data category",
          description:
            "Menghapus data pada tabel category yang ada dalam database berdasarkan id",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Id task",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil menghapus data category",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          name: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Category"],
        },
      },

      // Task ALl
      "/task/user/{user_id}": {
        get: {
          summary: "Mengambil semua data todo",
          description:
            "Mengambil semua data pada tabel todo yang ada dalam database",
          parameters: [
            {
              name: "user_id",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data produk",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        user_id: {
                          type: "integer",
                        },
                        category_id: {
                          type: "integer",
                        },
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        due_date: {
                          type: "date",
                        },
                        is_completed: {
                          type: "boolean",
                        },
                        created_date: {
                          type: "date",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Task"],
        },
      },

      // Task By ID
      "/task/{id}/user/{user_id}": {
        get: {
          summary: "Mengambil data kategori task By ID task",
          description:
            "Mengambil data pada tabel task yang ada dalam database berdasarkan id task",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID task yang ingin diambil",
              schema: {
                type: "integer",
              },
            },
            {
              name: "user_id",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data todo",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        user_id: {
                          type: "integer",
                        },
                        category_id: {
                          type: "integer",
                        },
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        due_date: {
                          type: "date",
                        },
                        is_completed: {
                          type: "boolean",
                        },
                        created_date: {
                          type: "date",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Task"],
        },
      },

      // Post Task
      "/task": {
        post: {
          summary: "Menambah data task",
          description: "Menambah data task",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user_id: {
                      type: "integer",
                    },
                    category_id: {
                      type: "integer",
                    },
                    title: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    is_completed: {
                      type: "boolean",
                    },
                    due_date: {
                      type: "date",
                    },
                  },
                  required: [
                    "user_id",
                    "category_id",
                    "title",
                    "description",
                    "due_date",
                  ],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          user_id: {
                            type: "integer",
                          },
                          category_id: {
                            type: "integer",
                          },
                          title: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          due_date: {
                            type: "date",
                          },
                          is_completed: {
                            type: "boolean",
                          },
                          created_date: {
                            type: "date",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Task"],
        },
      },

      // Put Task
      "/task/{id}/user/{user_id}": {
        put: {
          summary: "Mengubah data task",
          description:
            "Mengubah data pada tabel task yang ada dalam database berdasarkan task id",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID task produk yang ingin diubah",
              schema: {
                type: "integer",
              },
            },
            {
              name: "user_id",
              in: "path",
              required: true,
              description: "ID user",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    category_id: {
                      type: "integer",
                    },
                    title: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    is_completed: {
                      type: "boolean",
                    },
                    due_date: {
                      type: "date",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          user_id: {
                            type: "integer",
                          },
                          category_id: {
                            type: "integer",
                          },
                          title: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          due_date: {
                            type: "date",
                          },
                          is_completed: {
                            type: "boolean",
                          },
                          created_date: {
                            type: "date",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Task"],
        },
      },

      // Delete Taks
      "/task/{id}/user/{user_id}": {
        delete: {
          summary: "Menghapus data task",
          description:
            "Menghapus data pada tabel task yang ada dalam database berdasarkan id",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Id task",
              schema: {
                type: "integer",
              },
            },
            {
              name: "user_id",
              in: "path",
              required: true,
              description: "Id User",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil menghapus data task",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          id: {
                            type: "integer",
                          },
                          user_id: {
                            type: "integer",
                          },
                          category_id: {
                            type: "integer",
                          },
                          title: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          due_date: {
                            type: "date",
                          },
                          is_completed: {
                            type: "boolean",
                          },
                          created_date: {
                            type: "date",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["Task"],
        },
      },

      // user By id
      "/user/{id}": {
        get: {
          summary: "Mengambil data user",
          description: "Mengambil data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        username: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        phone: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // update user By id
      "/user/{id}": {
        put: {
          summary: "Update data user",
          description: "Update data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    phone: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengubah data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        username: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        phone: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // Register user
      "/user/register": {
        post: {
          summary: "Registrasi data user",
          description:
            "Registrasi data pada tabel user yang ada dalam database",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    phone: {
                      type: "string",
                    },
                  },
                  required: ["name", "no_hp"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil registrasi data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        username: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        phone: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // Login User
      "/user/login": {
        post: {
          summary: "Login User",
          description: "Login user",
          parameters: [
            {
              name: "no_hp",
              in: "path",
              required: true,
              description: "Nomor HP user",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                  required: ["username", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil login",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      username: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },
    },
  },
  apis: ["./routes/index.js", "./app.js"],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
