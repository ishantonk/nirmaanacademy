"use client";

import * as React from "react";

const VISIT_KEY = "lastVisitorRegisterDate";

function useRegisterVisitorDaily(registerVisitor: () => void) {
    React.useEffect(() => {
        console.log("useRegisterVisitorDaily");
        const today = new Date().toISOString().split("T")[0]; // format: 'YYYY-MM-DD'
        const lastVisit = localStorage.getItem(VISIT_KEY);

        if (lastVisit !== today) {
            registerVisitor();
            localStorage.setItem(VISIT_KEY, today);
        }
    }, [registerVisitor]);
}

export default useRegisterVisitorDaily;
