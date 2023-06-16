import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

const ColorContext = createContext({
	personalColor: '#1677FF',
});

export default ColorContext;