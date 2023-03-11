const cardRoutes = require('./../routes/CardRoutes');
const useRoutes =  require('./../routes/UserRoutes');

const express = require('express');

module.exports = function (app) {
app.use(express.json());

app.use("/api/cards", cardRoutes);
app.use("/api/user", useRoutes);

}