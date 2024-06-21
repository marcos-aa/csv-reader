import app from "./app";
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Running on ${port}`);
});
export default server;
