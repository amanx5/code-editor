import { useContext } from "react";
import { WorkbenchContext } from "../contexts";

export function useWorkbenchContext() {
    const context = useContext(WorkbenchContext);

    if (context === null) {
        throw new Error("useWorkbenchContext must be used within a WorkbenchProvider");
    }

    return context;
}