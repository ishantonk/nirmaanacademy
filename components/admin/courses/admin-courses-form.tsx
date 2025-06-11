"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGeneric } from "@/components/layout/form/form-generic";
import { ImageField } from "@/components/layout/form/image-field";
import { TextField } from "@/components/layout/form/text-field";
import { SelectField } from "@/components/layout/form/select-field";
import { MultiSelectField } from "@/components/layout/form/multi-select-field";
import { SwitchField } from "@/components/layout/form/switch-field";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { useUploadMutation } from "@/hooks/use-upload-mutation";
import { humanize } from "@/lib/utils";
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    FacultyType,
    ModeType,
} from "@/lib/types";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { FacultyAdd } from "@/components/layout/dialog/faculty-add";
import { CourseModeAdd } from "@/components/layout/dialog/course-mode-add";
import { CourseAttemptAdd } from "@/components/layout/dialog/course-attempt-add";
import { RichTextEditorField } from "@/components/layout/form/rich-text-editor-field";

interface AdminCoursesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminCourseFormValues>;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
    submitting?: boolean;
    onSubmit: (data: AdminCourseFormValues) => void;
}

export function AdminCoursesForm({
    formId,
    formProps,
    categories,
    faculties,
    attempts,
    modes,
    onSubmit,
}: AdminCoursesFormProps) {
    const uploadMutation = useUploadMutation({
        entityName: "Course thumbnail",
        field: "thumbnail",
        form: formProps,
    });

    return (
        <FormGeneric formId={formId} form={formProps} onSubmit={onSubmit}>
            {/* Course Thumbnail */}
            <ImageField
                control={formProps.control}
                name="thumbnail"
                uploadMutation={uploadMutation}
                description="Upload a course image to display as the thumbnail."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="col-span-full lg:col-span-3">
                    {/* Title */}
                    <TextField
                        control={formProps.control}
                        name="title"
                        placeholder="Enter course title (e.g., 'JavaScript Basics')"
                        description="Course title."
                        isRequired
                    />
                </div>
                <div className="col-span-full sm:col-span-2 lg:col-span-2">
                    {/* Category */}
                    <SelectField
                        control={formProps.control}
                        name="categoryId"
                        label="Category"
                        selectOptions={categories.map((category) => ({
                            label: humanize(category.name),
                            value: category.id,
                        }))}
                        className="w-full"
                        description="Choose the category."
                        isRequired
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <div className="col-span-full lg:col-span-3">
                    {/* Faculty */}
                    <MultiSelectField
                        control={formProps.control}
                        name="facultyIds"
                        label="Faculty"
                        multiSelectOptions={faculties.map((f) => ({
                            label: f.name,
                            value: f.id,
                            item: (
                                <CourseFacultyInfoCard size="sm" faculty={f} />
                            ),
                        }))}
                        placeholder="Select faculty"
                        description="Faculty teaching the course."
                        createNew={<FacultyAdd />}
                        searchInput
                        isRequired
                    />
                </div>

                <div className="col-span-full md:col-span-1 lg:col-span-2">
                    {/* Modes */}
                    <MultiSelectField
                        control={formProps.control}
                        name="modeIds"
                        label="Modes"
                        multiSelectOptions={modes.map((m) => ({
                            label: m.name,
                            value: m.id,
                        }))}
                        createNew={<CourseModeAdd />}
                        placeholder="Select course modes"
                        description="Select online, offline, or hybrid."
                        isRequired
                    />
                </div>

                <div className="col-span-full md:col-span-1 lg:col-span-2">
                    {/* Attempts */}
                    <MultiSelectField
                        control={formProps.control}
                        name="attemptIds"
                        label="Attempts"
                        multiSelectOptions={attempts.map((a) => ({
                            label: a.name,
                            value: a.id,
                        }))}
                        createNew={<CourseAttemptAdd />}
                        placeholder="Select attempts"
                        description="Define available attempts for assessments."
                        isRequired
                    />
                </div>
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextField
                    control={formProps.control}
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    description="Course price."
                    isRequired
                />
                <TextField
                    control={formProps.control}
                    name="discountPrice"
                    type="number"
                    placeholder="Enter discount price"
                    description="Discounted price (optional)."
                />
            </div>

            {/* Toggles: onSale, featured */}
            <div className="flex flex-col sm:flex-row gap-4">
                <SwitchField
                    control={formProps.control}
                    name="onSale"
                    description="Enable sale for this course."
                />
                <SwitchField
                    control={formProps.control}
                    name="featured"
                    description="Feature this course on homepage."
                />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                    control={formProps.control}
                    name="videoLanguage"
                    placeholder="Video language"
                    description="Language of course videos."
                />
                <TextField
                    control={formProps.control}
                    name="courseMaterialLanguage"
                    placeholder="Material language"
                    description="Language of course materials."
                />
            </div>

            {/* Demo Video URL */}
            <TextField
                control={formProps.control}
                name="demoVideoUrl"
                placeholder="Demo video URL"
                description="Link to course demo video."
            />

            {/* Description */}
            <RichTextEditorField
                name="description"
                placeholder="Enter course description"
                description="Brief course overview."
            />
        </FormGeneric>
    );
}
