import Spinner from "@/ui/Spinner";
import useAllTemplates from "@/features/template/useAllTemplates";
import { ImageMinus } from "lucide-react";

export default function TemplatesList() {
    const { templates, templatesLoading } = useAllTemplates()

    if (templatesLoading) return <Spinner />

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                templates?.map((template, index) => {
                    const fileUrl = `http://localhost:5001/files/${template.filePath}`;

                    return (
                        <div
                            key={index}
                            className="relative p-4 border rounded-lg bg-slate-50 border-slate-300"
                        >

                            <div
                                className="cursor-pointer"
                                onClick={() => window.open(fileUrl, "_blank")}
                            >
                                <div className="flex items-center justify-center w-full h-64 rounded-lg md:h-44 bg-slate-300">
                                    <ImageMinus className="text-slate-500 size-8" />
                                </div>
                                <h3 className="mt-3 text-xl font-semibold text-center">
                                    {template.title}
                                </h3>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
