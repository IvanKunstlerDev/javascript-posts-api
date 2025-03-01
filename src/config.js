if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
}

export default {
  port: Number(process.env.PORT) || 3000,
  postsPaginationSize: Number(process.env.POSTS_PAGINATION_SIZE) || 10,
};
