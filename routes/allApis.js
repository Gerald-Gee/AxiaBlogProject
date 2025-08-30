import Router from "express";

const allApis = Router();

const apis = [
  {
    name: "user",
    description: "User related APIs",
    endpoints: [
      "POST /api/user/create",
      "POST /api/user/login",
      "POST /api/user/verifyOTP",
      "POST /api/user/resendOTP",
    ],
  },
  {
    name: "post",
    description: "Blog post related APIs",
    endpoints: [
      "POST /api/post/create",
      "GET /api/posts",
      "GET /api/post/:id",
      "PUT /api/post/update/:id",
      "DELETE /api/post/delete/:id",
    ],
  },
  {
    name: "comment",
    description: "Comment related APIs",
    endpoints: [
      "POST /api/comment/add",
      "GET /api/comment/:postId",
      "DELETE /api/comment/delete/:id",
    ],
  },
];

allApis.get("/", (req, res) => res.status(200).json(apis));

export default allApis;
