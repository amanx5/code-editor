import { createContext } from "react";
import type { ToolbarOptions, ToolbarStates } from "../components";
import type { EditorProps } from "code-editor";

export type WorkbenchContext = {
    editorProps: EditorProps;
    toolbarOptions?: ToolbarOptions;
    toolbarStates: ToolbarStates;
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null);

