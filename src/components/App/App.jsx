import { hot } from "react-hot-loader";
import React from "react";

import Grid from "../Grid/Grid";

import "./App.css";

const headers = ["Firstname", "Lastname", "Age"];

const data = [
  ["John", "Doe", "24"],
  ["Jan", "Kowalski", "32"],
  ["Jose", "Gonzalez", "37"],
];

const App = () => (
  <Grid headers={headers} data={data} />
);

export default hot(module)(App);
