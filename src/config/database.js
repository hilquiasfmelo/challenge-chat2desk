module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'chat2desk',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
