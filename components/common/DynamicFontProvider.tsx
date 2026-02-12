import { getContent } from "@/app/actions/common";

export async function DynamicFontProvider() {
  try {
    const content = await getContent();
    const fontUrl = content["font_google_link"];
    const fontFamily = content["font_family_name"];

    if (!fontUrl || !fontFamily) return null;

    return (
      <>
        <link href={fontUrl} rel="stylesheet" />
        <style>{`
            :root {
              --font-body: '${fontFamily}', var(--font-inter), sans-serif;
              --font-display: '${fontFamily}', var(--font-inter), serif;
              --font-heading: '${fontFamily}', var(--font-inter), sans-serif;
            }
         `}</style>
      </>
    );
  } catch (error: any) {
    console.error("Error in DynamicFontProvider:", error);
    return null;
  }
}
