"use client";

import { registerVisitor } from "@/lib/services/api";
import useRegisterVisitorDaily from "@/hooks/use-register-visitor-daily";

export function VisitorTracker() {
    useRegisterVisitorDaily(registerVisitor);
    return null; // Nothing to render
}
