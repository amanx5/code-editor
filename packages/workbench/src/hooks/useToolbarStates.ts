import { useState } from "react";
import { ToolbarStatesDefault, type ToolbarStates } from "../components";

export function useToolbarStates(): ToolbarStates {
    const [isWrapEnabled, setIsWrapEnabled] = useState(
        ToolbarStatesDefault.isWrapEnabled
    );

    const [isFormatEnabled, setIsFormatEnabled] = useState(
        ToolbarStatesDefault.isFormatEnabled
    );

    return {
        isWrapEnabled,
        isFormatEnabled,
        setIsWrapEnabled,
        setIsFormatEnabled,
    };
}
