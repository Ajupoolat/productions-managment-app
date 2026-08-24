
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = 32 }: { size?: number }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2
                className="animate-spin text-primary"
                size={size}
            />
        </div>
    );
}

