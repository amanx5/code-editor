import { createContext } from "react";
import type { ToolbarOptions, ToolbarStates } from "../components";

export type WorkbenchContext = {
    toolbarOptions?: ToolbarOptions;
    toolbarStates: ToolbarStates;
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null);

