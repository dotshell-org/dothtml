"use client";

import { useContext } from "react";
import { I18nContext } from "./I18nProvider";

export const useI18n = () => useContext(I18nContext);
