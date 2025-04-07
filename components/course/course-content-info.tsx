import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDuration } from "@/lib/format";

interface CourseContentInfoProps {
    duration?: number;
    videoLanguage: string | null;
    courseMaterialLanguage?: string | null;
    selectedMode?: {
        id: string;
        name: string;
        slug: string;
    };
    enrollments?: Array<{
        id: string;
        userId: string;
        courseId: string;
    }>;
}

export function CourseContentInfo({selectedMode, duration, enrollments, videoLanguage, courseMaterialLanguage}: CourseContentInfoProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold">Course content</h2>
            <div className="mt-4">
                <Table className="border-collapse border">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-1/3">Property</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Mode</TableCell>
                            <TableCell>{selectedMode?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Duration
                            </TableCell>
                            <TableCell>
                                {duration ? formatDuration(duration * 60) : "N/A"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                No. of Enrollments
                            </TableCell>
                            <TableCell>
                                {enrollments ? enrollments.length + " " + "students" : "N/A"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                No. of Views
                            </TableCell>
                            <TableCell>
                                Unlimited Views (Till Attempt)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Video Language
                            </TableCell>
                            <TableCell>{videoLanguage ?? "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Course Material Language
                            </TableCell>
                            <TableCell>{courseMaterialLanguage ?? "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Study Material
                            </TableCell>
                            <TableCell>2 Printed Hard-Books</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Package Details
                            </TableCell>
                            <TableCell>
                                Video Lectures + Study Material
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Doubt Solving
                            </TableCell>
                            <TableCell>WhatsApp/Calling</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Delivery
                            </TableCell>
                            <TableCell>Non Cancelable</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Dispatch
                            </TableCell>
                            <TableCell>Within 24 Hours</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
